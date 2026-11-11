/* Removed styles leave no runtime assets/options, and old preferences migrate safely. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://127.0.0.1:8765';
const revision = 'a90bef16de8945194a1cb4c27a33ae94276ed60a';
const current = fs.readFileSync('scripts/site-style.js', 'utf8');
const previous = execFileSync('git', ['show', revision + ':scripts/site-style.js'], { encoding: 'utf8' });
const styleNames = code => vm.runInNewContext(code.match(/const styles = (\[[^\]]+\]);/)[1]);
const remaining = Array.from(styleNames(current));
const removed = Array.from(styleNames(previous)).filter(name => !remaining.includes(name));
assert.equal(remaining.length, 7);
assert.equal(removed.length, 1);
const retired = removed[0];
const pages = fs.readdirSync('.').filter(file => file.endsWith('.html'));
const deleted = execFileSync('git', ['ls-tree', '-r', '--name-only', revision, '--', 'styles/' + retired + '.css', 'assets/themes/' + retired, 'tests/' + retired + '-art.cjs'], { encoding: 'utf8' }).trim().split('\n');
assert.equal(deleted.length, 5);
for (const file of deleted) assert.equal(fs.existsSync(file), false, 'Retained theme file: ' + file);
for (const file of [...pages, 'scripts/site-style.js', 'styles/site-style.css', 'styles/library-experience.css', 'scripts/app.js']) assert.equal(fs.readFileSync(file, 'utf8').toLowerCase().includes(retired), false, file + ': retained runtime implementation');

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  const errors = [], unwanted = [];
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await context.route('https://patchwiki.biligame.com/**', route => route.fulfill({ path: 'assets/themes/furina/artwork.png', contentType: 'image/png' }));
    context.on('request', request => {
      if (request.url().includes('/' + retired) || /i0\.hdslb\.com|c-ssl\.dtstatic\.com/.test(request.url())) unwanted.push(request.url());
    });
    await context.addInitScript(retired => {
      localStorage.setItem('jy-style', retired);
      localStorage.setItem('jy-style-' + retired, JSON.stringify({ accent: 'violet', theme: 'light' }));
      localStorage.setItem('jy-accent', 'violet'); localStorage.setItem('jy-theme', 'light');
      localStorage.setItem('jy-style-classic', JSON.stringify({ accent: 'blue', theme: 'dark' }));
      localStorage.setItem('jy-style-furina', JSON.stringify({ accent: 'orange', theme: 'light' }));
      localStorage.setItem('jy-favorites', JSON.stringify(['mdn', 'minecraft']));
      localStorage.setItem('jy-library-view', JSON.stringify('list'));
      localStorage.setItem('jy-language', 'zh-TW');
    }, retired);
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
    let checks = 0;
    for (const file of pages) {
      await page.goto(base + '/' + file);
      assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { style: 'classic', theme: 'dark', accent: 'blue' }, file + ': lost Classic preference');
      assert.equal(await page.evaluate(() => localStorage.getItem('jy-style')), 'classic');
      assert.equal(await page.evaluate(retired => localStorage.getItem('jy-style-' + retired), retired), null);
      assert.deepEqual(await page.locator('[data-style-choice]').evaluateAll(elements => elements.map(element => element.dataset.styleChoice)), remaining);
      assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('jy-style-furina'))), { accent: 'orange', theme: 'light' });
      assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('jy-favorites'))), ['mdn', 'minecraft']);
      assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('jy-library-view'))), 'list');
      for (const language of ['zh-CN', 'zh-TW', 'en', 'ja']) {
        await page.evaluate(language => document.querySelector('[data-language="' + language + '"]').click(), language);
        assert.equal(await page.locator('[data-style-choice]').count(), remaining.length);
        assert.equal(await page.locator('[data-style-choice][aria-pressed=true]').count(), 1);
        for (const width of [320, 390]) {
          await page.setViewportSize({ width, height: 844 });
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, file + ': layout overflow');
        }
        checks++;
      }
      assert.equal(await page.evaluate(retired => !!document.querySelector('[class*="' + retired + '"],[data-style-choice="' + retired + '"]'), retired), false);
    }
    await page.goto(base + '/');
    await page.locator('#settings-trigger').click();
    for (const style of remaining) {
      await page.locator('[data-style-choice=' + style + ']').click();
      assert.equal(await page.locator('html').getAttribute('data-style'), style);
    }
    await page.evaluate(retired => {
      localStorage.setItem('jy-style', retired);
      localStorage.setItem('jy-style-' + retired, '{}');
      window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
    }, retired);
    assert.equal(await page.locator('html').getAttribute('data-style'), 'classic');
    assert.equal(await page.evaluate(retired => localStorage.getItem('jy-style-' + retired), retired), null);
    await context.close();

    const fresh = await browser.newContext({ colorScheme: 'dark' });
    await fresh.addInitScript(retired => {
      localStorage.setItem('jy-style', retired);
      localStorage.setItem('jy-accent', 'violet'); localStorage.setItem('jy-theme', 'light');
    }, retired);
    const fallback = await fresh.newPage();
    fallback.on('pageerror', error => errors.push(error.message));
    await fallback.goto(base + '/');
    assert.deepEqual(await fallback.evaluate(() => ({ ...document.documentElement.dataset })), { style: 'classic', theme: 'dark', accent: 'graphite' });
    assert.equal(await fallback.evaluate(() => localStorage.getItem('jy-theme')), 'auto');
    await fresh.close();

    const preserved = await browser.newContext();
    await preserved.route('https://patchwiki.biligame.com/**', route => route.fulfill({ path: 'assets/themes/furina/artwork.png', contentType: 'image/png' }));
    await preserved.addInitScript(retired => {
      localStorage.setItem('jy-style', 'furina');
      localStorage.setItem('jy-accent', 'orange'); localStorage.setItem('jy-theme', 'light');
      localStorage.setItem('jy-style-furina', JSON.stringify({ accent: 'orange', theme: 'light' }));
      localStorage.setItem('jy-style-' + retired, '{}');
    }, retired);
    const valid = await preserved.newPage();
    valid.on('pageerror', error => errors.push(error.message));
    await valid.goto(base + '/');
    assert.deepEqual(await valid.evaluate(() => ({ ...document.documentElement.dataset })), { style: 'furina', theme: 'light', accent: 'orange' });
    assert.equal(await valid.evaluate(retired => localStorage.getItem('jy-style-' + retired), retired), null);
    await preserved.close();

    const denied = await browser.newContext();
    await denied.route('https://patchwiki.biligame.com/**', route => route.fulfill({ path: 'assets/themes/furina/artwork.png', contentType: 'image/png' }));
    await denied.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('blocked', 'SecurityError'); } }));
    const blocked = await denied.newPage();
    blocked.on('pageerror', error => errors.push(error.message));
    await blocked.goto(base + '/');
    await blocked.locator('#settings-trigger').click();
    await blocked.locator('[data-style-choice=furina]').click();
    await blocked.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
    assert.equal(await blocked.locator('html').getAttribute('data-style'), 'furina', 'Blocked storage should preserve in-page switching');
    await denied.close();
    assert.deepEqual(unwanted, [], 'Deleted theme must never request images/styles');
    assert.deepEqual(errors, []);
    console.log('PASS removed theme: 5 files deleted, no runtime implementation or requests, ' + pages.length + ' pages / ' + checks + ' language checks, ' + remaining.length + ' remaining styles; saved/default Classic migration, other preferences preserved, BFCache and storage denied');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
