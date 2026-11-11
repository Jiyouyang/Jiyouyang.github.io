/* Real user flows for the shared library: persistence, aliases, clipboard,
   hub/catalog parity, return state, and responsive theme/language controls. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://127.0.0.1:8765';
const fixture = { window: {} };
vm.runInNewContext(fs.readFileSync('scripts/resource-catalog.js', 'utf8'), fixture);
const catalog = JSON.parse(JSON.stringify(fixture.window.JYCatalog));
const byURL = new Map(catalog.map(item => [new URL(item.url, base).href, item]));
const languages = ['zh-CN', 'zh-TW', 'en', 'ja'];
const styles = ['classic', 'terminal', 'mecha', 'blackgold', 'columbina', 'furina', 'mahiro'];
const normalize = value => value.replace(/\s+/g, ' ').trim();

(async () => {
  // The catalogue move must not silently alter the published home entries.
  const old = execFileSync('git', ['show', 'dbe9c44:scripts/app.js'], { encoding: 'utf8' });
  const before = { window: {} };
  vm.runInNewContext(old.slice(old.indexOf('const resources = ['), old.indexOf('// Add future update')) + '; window.entries = resources;', before);
  const extra = ['home', 'source', 'platforms', 'aliases', 'parent'];
  const home = catalog.filter(item => item.home).map(item => Object.fromEntries(Object.entries(item).filter(([key]) => !extra.includes(key))));
  assert.deepEqual(home, JSON.parse(JSON.stringify(before.window.entries)));
  assert.equal(catalog.length, 42);
  assert.equal(new Set(catalog.map(item => item.id)).size, 42);
  for (const item of catalog) for (const language of languages) assert.equal(item.content[language].length, 2);

  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await context.route('https://i0.hdslb.com/**', route => route.fulfill({ path: 'assets/themes/mahiro/portrait.jpg', contentType: 'image/jpeg' }));
    await context.route('https://c-ssl.dtstatic.com/**', route => route.fulfill({ path: 'assets/themes/mahiro/background.jpg', contentType: 'image/jpeg' }));
    await context.route('https://patchwiki.biligame.com/**', route => route.fulfill({ path: 'assets/themes/furina/artwork.png', contentType: 'image/png' }));
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { window.__copied = value; } } });
    });
    const page = await context.newPage(), errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
    const favorite = id => page.locator('#resource-grid .library-entry[data-entry-id="' + id + '"] [data-library-action=favorite]');
    await page.goto(base + '/');
    assert.equal(await page.locator('.resource-card').count(), 14);
    const homeURL = page.url();
    await favorite('mdn').click(); await favorite('genshin').click();
    assert.equal(page.url(), homeURL);
    assert.deepEqual(await page.locator('.favorite-entry').evaluateAll(es => es.map(e => e.dataset.favoriteId)), ['mdn', 'genshin']);
    await page.locator('#organize-favorites').click();
    await page.locator('[data-favorite-id=mdn] [data-move="1"]').click();
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('jy-favorites'))), ['genshin', 'mdn']);
    await page.locator('[data-favorite-id=mdn] [data-library-action=favorite]').click();
    assert.equal(await page.locator('#organize-favorites').getAttribute('aria-pressed'), 'false');
    await page.reload();
    assert.equal(await page.locator('.favorite-entry').getAttribute('data-favorite-id'), 'genshin');
    await page.locator('[data-library-view=list]').click();
    await page.reload();
    assert.equal(await page.locator('#resource-grid').getAttribute('data-view'), 'list');

    await page.locator('#search-jump').click();
    await page.locator('#quick-search-input').fill('MC');
    assert.ok((await page.locator('.quick-result').count()) >= 6);
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.locator('#quick-search-input').getAttribute('aria-activedescendant'), 'quick-option-0');
    await page.keyboard.press('Enter');
    await page.waitForURL('**/minecraft.html');
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('jy-search-history'))), ['MC']);
    await page.goto(base + '/');
    await page.locator('.hero h1').click();
    await page.keyboard.press('/');
    assert.equal(await page.locator('#quick-search').evaluate(el => el.open), true);
    assert.equal(await page.locator('[data-history-index]').first().textContent(), 'MC');
    await page.locator('#clear-search-history').click();
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('jy-search-history'))), []);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('#quick-search').open && document.body.style.overflow === '');
    assert.equal(await page.evaluate(() => document.body.style.overflow), '');
    await page.locator('#settings-trigger').click();
    await page.keyboard.press('Control+k');
    assert.equal(await page.locator('#quick-search').evaluate(el => el.open), false, 'Do not open stacked search over settings');
    await page.keyboard.press('Escape');

    await page.locator('[data-category=tools]').click();
    await page.locator('#search').fill('电脑');
    assert.equal(await page.locator('.resource-card').count(), 1);
    await page.locator('.resource-card').click();
    await page.waitForURL('**/computer-tools.html');
    await page.locator('.back').click();
    await page.waitForFunction(() => document.querySelector('#search')?.value === '电脑');
    assert.equal(await page.locator('[data-category=tools]').getAttribute('aria-pressed'), 'true');

    // Match every mirrored hub resource and all translations against the real cards.
    let hubChecks = 0;
    for (const file of ['minecraft.html', 'computer-tools.html', 'genshin.html', 'zzz.html', 'hsr.html', 'endfield.html']) {
      await page.goto(base + '/' + file);
      for (const language of languages) {
        await page.evaluate(language => document.querySelector('[data-language="' + language + '"]').click(), language);
        for (const card of await page.locator('a.hub-card').all()) {
          const item = byURL.get(await card.evaluate(el => el.href));
          assert.ok(item, file + ': missing catalogue entry');
          assert.equal(normalize(await card.locator('h3').textContent()), normalize(item.content[language][0]));
          assert.equal(normalize(await card.locator('p').textContent()), normalize(item.content[language][1]));
          assert.equal(await card.locator('.source-badge').count(), 1);
          hubChecks++;
        }
      }
    }
    assert.equal(hubChecks, 112);

    let copies = 0;
    for (const file of fs.readdirSync('.').filter(file => file.endsWith('.html'))) {
      await page.goto(base + '/' + file);
      for (const tab of await page.locator('[data-platform]').all()) {
        await tab.click();
        await page.waitForFunction(() => {
          const links = [...document.querySelectorAll('a.download-button')].filter(el => !el.hidden);
          const copies = [...document.querySelectorAll('.library-copy-download')];
          return copies.length === links.length && copies.every((copy, i) => copy.dataset.copyUrl === links[i].href);
        });
        const links = await page.locator('a.download-button:visible').evaluateAll(es => es.map(el => el.href));
        const buttons = await page.locator('.library-copy-download').all();
        for (let i = 0; i < buttons.length; i++) {
          await buttons[i].click();
          assert.equal(await page.evaluate(() => window.__copied), links[i], file + ': stale platform link');
          copies++;
        }
      }
    }
    await page.goto(base + '/');
    await page.evaluate(() => { Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw Error('denied'); } } }); });
    await page.locator('#resource-grid .library-entry[data-entry-id=github] [data-library-action=copy]').click();
    await page.locator('#copy-link-dialog[open]').waitFor();
    assert.equal(await page.locator('#copy-link-dialog input').inputValue(), 'https://github.com/');
    await page.keyboard.press('Escape');

    await page.locator('#search').fill('');
    await page.locator('[data-category=all]').click();
    await page.locator('.announcement > summary').click();
    assert.equal(await page.locator('.update-day').first().getAttribute('open'), '');
    assert.equal(await page.locator('.update-entry.is-latest').count(), 1);
    assert.equal(await page.locator('[data-update-id="2026-11-11-library-experience"]').count(), 1);
    let layouts = 0;
    for (const style of styles) for (const mode of ['light', 'dark']) for (const language of languages) {
      await page.evaluate(({ style, mode, language }) => {
        document.querySelector('[data-style-choice=' + style + ']').click();
        document.querySelector('[data-mode=' + mode + ']').click();
        document.querySelector('[data-language="' + language + '"]').click();
      }, { style, mode, language });
      for (const width of [320, 390, 1440]) for (const view of ['cards', 'list']) {
        await page.setViewportSize({ width, height: 844 });
        await page.locator('[data-library-view=' + view + ']').click();
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, [style, mode, language, width, view].join(' '));
        await page.keyboard.press('Control+k');
        await page.locator('#quick-search-input').fill('原神');
        assert.ok(await page.locator('.quick-result').count());
        assert.equal(await page.locator('#quick-search').evaluate(el => el.scrollWidth > el.clientWidth + 1), false);
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => !document.querySelector('#quick-search').open && document.body.style.overflow === '');
        layouts++;
      }
    }
    await page.evaluate(() => { document.querySelector('[data-style-choice=classic]').click(); document.querySelector('[data-mode=light]').click(); document.querySelector('[data-language="zh-CN"]').click(); });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: '/tmp/library-final-mobile.png', fullPage: true });
    await page.locator('#search-jump').click();
    await page.locator('#quick-search-input').fill('MC');
    await page.screenshot({ path: '/tmp/library-final-search.png' });

    const denied = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await denied.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('blocked', 'SecurityError'); } }); });
    const blocked = await denied.newPage();
    blocked.on('pageerror', error => errors.push(error.message));
    await blocked.goto(base + '/');
    await blocked.locator('#resource-grid .library-entry[data-entry-id=mdn] [data-library-action=favorite]').click();
    assert.equal(await blocked.locator('.favorite-entry').count(), 1);
    assert.match(await blocked.locator('.favorites-storage').textContent(), /未允许保存/);
    await denied.close();
    assert.deepEqual(errors, []);
    console.log('PASS library: original 14 + 28 mirrored entries,', hubChecks, 'translated hub cards, favorites/reorder/persistence, shortcut/history/return state,', copies, 'live platform copies, manual fallback,', layouts, 'theme/mode/language/layout combinations, storage denied');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
