/* MTF artwork: local-only/lazy delivery, framing, source labels and resilient fallback. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://127.0.0.1:8765';
const path = 'assets/themes/mtf/pride-flag.svg';
const flag = fs.readFileSync(path);
assert.equal(flag.length, 273);
assert.equal(crypto.createHash('sha256').update(flag).digest('hex'), 'a46c2d7f8524ce172136c8810256b9b0b0fb3301c8b98e680394554d865f5fc8');
assert.match(flag.toString(), /viewBox="0 0 800 480"/);
for (const color of ['#5BCEFA', '#F5A9B8', '#FFF']) assert.ok(flag.includes(color));
assert.doesNotMatch(flag.toString(), /<script|href=|\bon\w+=/i);
const styles = ['classic', 'terminal', 'mecha', 'blackgold', 'columbina', 'furina', 'mtf'];
const oldStyles = styles.filter(style => style !== 'mtf');

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await context.route('https://patchwiki.biligame.com/**', route => route.fulfill({ path: 'assets/themes/furina/artwork.png', contentType: 'image/png' }));
    const page = await context.newPage(), requests = [], errors = [];
    page.on('request', request => { if (request.url().includes('/assets/themes/mtf/')) requests.push(request.url()); });
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
    await page.goto(base + '/');
    assert.deepEqual(await page.locator('[data-style-choice]').evaluateAll(elements => elements.map(element => element.dataset.styleChoice)), styles);
    for (const style of oldStyles) await page.evaluate(style => document.querySelector('[data-style-choice=' + style + ']').click(), style);
    assert.deepEqual(requests, [], 'Existing styles must not request the new flag');
    const links = await page.locator('main a').evaluateAll(elements => elements.map(element => element.href));
    await page.locator('#settings-trigger').click();
    await page.locator('[data-style-choice=mtf]').click();
    assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { style: 'mtf', theme: 'light', accent: 'blue' });
    await page.locator('#close-settings').click();
    assert.deepEqual(await page.locator('main a').evaluateAll(elements => elements.map(element => element.href)), links);
    await page.waitForFunction(() => [...document.querySelectorAll('.mtf-scene img,.mtf-backdrop img')].every(image => image.complete && image.naturalWidth));
    assert.ok(requests.length);
    assert.ok(requests.every(url => new URL(url).origin === new URL(base).origin), 'No external runtime artwork dependency');
    const scoped = await page.evaluate(() => {
      const sheet = [...document.styleSheets].find(sheet => sheet.href?.includes('/styles/mtf.css'));
      const walk = rules => [...rules].every(rule => rule.selectorText ? rule.selectorText.includes('[data-style="mtf"]') : rule.cssRules ? walk(rule.cssRules) : false);
      return walk(sheet.cssRules);
    });
    assert.equal(scoped, true, 'New visual rules must be scoped');
    let layouts = 0, positions = 0;
    for (const file of fs.readdirSync('.').filter(file => file.endsWith('.html'))) {
      await page.goto(base + '/' + file);
      await page.waitForFunction(() => [...document.querySelectorAll('.mtf-scene img,.mtf-backdrop img')].every(image => image.complete && image.naturalWidth));
      assert.equal(await page.locator('.mtf-scene').count(), 1);
      assert.equal(await page.locator('.mtf-backdrop').count(), 1);
      assert.equal(await page.locator('.mtf-scene img').getAttribute('alt'), '');
      assert.equal(await page.locator('.mtf-scene').getAttribute('aria-hidden'), 'true');
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 844 });
        const layout = await page.evaluate(() => {
          const art = document.querySelector('.mtf-scene').getBoundingClientRect(), title = document.querySelector('.hero h1').getBoundingClientRect();
          return { overlap: art.left < title.right && art.right > title.left && art.top < title.bottom && art.bottom > title.top, overflow: document.documentElement.scrollWidth > innerWidth };
        });
        assert.deepEqual(layout, { overlap: false, overflow: false }, file + ' / ' + width);
        layouts++;
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator('#settings-trigger').click();
      for (const language of ['zh-CN', 'zh-TW', 'en', 'ja']) {
        await page.evaluate(language => document.querySelector('[data-language="' + language + '"]').click(), language);
        assert.match(await page.locator('.mtf-credit').textContent(), /Wikimedia Commons/);
        assert.equal(await page.locator('.mtf-credit a').getAttribute('href'), 'https://commons.wikimedia.org/wiki/File:Transgender_Pride_flag.svg');
        assert.equal(await page.locator('.mtf-caption').textContent(), { 'zh-CN': '自在，自信，做自己。', 'zh-TW': '自在，自信，做自己。', en: 'Be yourself, in your own light.', ja: '自分らしく、自分の光で。' }[language]);
        for (const width of [320, 390]) {
          await page.setViewportSize({ width, height: 844 });
          positions += await page.evaluate(() => {
            const number = value => parseFloat(value) || 0;
            let checks = 0;
            for (const group of document.querySelectorAll('.platform-tabs,.segmented')) for (const button of group.querySelectorAll('button')) {
              button.click();
              const css = getComputedStyle(group, '::before'), box = group.getBoundingClientRect(), target = button.getBoundingClientRect();
              const left = box.left + number(getComputedStyle(group).borderLeftWidth) + number(css.left) + new DOMMatrix(css.transform).m41;
              if (Math.abs(left - target.left) > .15 || Math.abs(left + number(css.width) - target.right) > .15) throw Error('MTF indicator does not align');
              checks++;
            }
            return checks;
          });
        }
      }
      for (const style of oldStyles) {
        await page.evaluate(style => document.querySelector('[data-style-choice=' + style + ']').click(), style);
        for (const selector of ['.mtf-scene', '.mtf-backdrop', '.mtf-credit']) assert.equal(await page.locator(selector).isVisible(), false);
      }
      await page.evaluate(() => document.querySelector('[data-style-choice=mtf]').click());
      await page.locator('#close-settings').click();
    }
    for (const mode of ['error', 'timeout']) {
      const failure = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      let started, released = false;
      const pending = [], began = new Promise(resolve => { started = resolve; });
      if (mode === 'timeout') await failure.clock.install();
      await failure.route('**/assets/themes/mtf/pride-flag.svg', route => {
        if (mode === 'error') return route.abort();
        if (released) return route.fulfill({ path, contentType: 'image/svg+xml' });
        pending.push(route); started();
      });
      failure.on('pageerror', error => errors.push(error.message));
      await failure.goto(base + '/');
      await failure.evaluate(() => document.querySelector('[data-style-choice=mtf]').click());
      if (mode === 'timeout') { await began; await failure.clock.fastForward(8100); }
      await failure.locator('.mtf-scene.is-unavailable').waitFor({ state: 'attached' });
      await failure.locator('.mtf-backdrop.is-unavailable').waitFor({ state: 'attached' });
      assert.ok(await failure.locator('.hero h1').isVisible());
      assert.equal(await failure.locator('.resource-card').count(), 14);
      if (mode === 'timeout') {
        released = true;
        await Promise.all(pending.map(route => route.fulfill({ path, contentType: 'image/svg+xml' })));
        await failure.waitForFunction(() => [...document.querySelectorAll('.mtf-scene,.mtf-backdrop')].every(frame => !frame.classList.contains('is-unavailable') && frame.querySelector('img').naturalWidth));
      }
      await failure.close();
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + '/');
    await page.evaluate(() => { document.querySelector('[data-language="zh-CN"]').click(); document.querySelector('[data-mode=light]').click(); document.querySelector('[data-accent-choice=blue]').click(); });
    await page.screenshot({ path: '/tmp/mtf-mobile-final.png' });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({ path: '/tmp/mtf-desktop-final.png' });
    assert.deepEqual(errors, []);
    console.log('PASS MTF: local public-domain SVG/hash; lazy/scoped artwork; 17 pages / ' + layouts + ' layouts, 4 languages, ' + positions + ' indicator positions; other-theme hiding; error/timeout/late success');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
