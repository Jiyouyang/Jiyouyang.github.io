/* Character artwork integration, domestic request origin, ordering, framing and failure handling. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://127.0.0.1:8765';
const art = 'https://patchwiki.biligame.com/images/ys/thumb/8/89/s8dltubvboh981ynwjo6jszgwqf1zwr.png/1000px-%E7%94%9F%E8%B4%BA%C2%B7%E8%8A%99%E5%AE%81%E5%A8%9C%C2%B72024.png';
const oldStyles = ['classic', 'terminal', 'mecha', 'blackgold', 'columbina', 'mahiro'];

(async () => {
  const args = ['--no-sandbox'];
  if (process.env.CHROMIUM_TRUSTED_SPKI) args.push('--ignore-certificate-errors-spki-list=' + process.env.CHROMIUM_TRUSTED_SPKI);
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await context.route('https://i0.hdslb.com/**', route => route.fulfill({ path: 'assets/themes/mahiro/portrait.jpg', contentType: 'image/jpeg' }));
    await context.route('https://c-ssl.dtstatic.com/**', route => route.fulfill({ path: 'assets/themes/mahiro/background.jpg', contentType: 'image/jpeg' }));
    if (!process.argv.includes('--live')) await context.route(art, route => route.fulfill({ path: 'assets/themes/furina/artwork.png', contentType: 'image/png' }));
    const page = await context.newPage(), requests = [], errors = [];
    page.on('request', request => { if (request.url() === art || request.url().includes('/assets/themes/furina/')) requests.push(request.url()); });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/');
    assert.deepEqual(await page.locator('[data-style-choice]').evaluateAll(es => es.map(e => e.dataset.styleChoice)), ['classic', 'terminal', 'mecha', 'blackgold', 'columbina', 'furina', 'mahiro']);
    for (const style of oldStyles) await page.evaluate(style => document.querySelector('[data-style-choice=' + style + ']').click(), style);
    assert.deepEqual(requests, [], 'Old styles must not request Furina art');
    await page.evaluate(() => document.querySelector('[data-style-choice=furina]').click());
    await page.waitForFunction(() => [...document.querySelectorAll('.furina-scene img,.furina-backdrop img')].every(img => img.complete && img.naturalWidth));
    assert.ok(requests.includes(art), 'Actual image request must use the domestic CDN');
    if (process.argv.includes('--live')) {
      for (const selector of ['.furina-scene img', '.furina-backdrop img']) assert.equal(await page.locator(selector).evaluate(img => img.currentSrc), art, 'Live CDN request must succeed without local fallback');
      console.log('PASS live domestic Bilibili image requests');
    }
    let positions = 0;
    for (const file of fs.readdirSync('.').filter(file => file.endsWith('.html'))) {
      await page.goto(base + '/' + file);
      await page.waitForFunction(() => [...document.querySelectorAll('.furina-scene img,.furina-backdrop img')].every(img => img.complete && img.naturalWidth));
      assert.equal(await page.locator('.furina-scene img').evaluate(img => img.naturalWidth), 1000);
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 844 });
        const layout = await page.evaluate(() => {
          const a = document.querySelector('.furina-scene').getBoundingClientRect(), t = document.querySelector('.hero h1').getBoundingClientRect();
          return { overlap: a.left < t.right && a.right > t.left && a.top < t.bottom && a.bottom > t.top, overflow: document.documentElement.scrollWidth > innerWidth };
        });
        assert.deepEqual(layout, { overlap: false, overflow: false }, file + ' at ' + width);
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator('#settings-trigger').click();
      for (const language of ['zh-CN', 'zh-TW', 'en', 'ja']) {
        await page.evaluate(language => document.querySelector('[data-language="' + language + '"]').click(), language);
        assert.match(await page.locator('.furina-credit').textContent(), /BWIKI/);
        for (const width of [320, 390]) {
          await page.setViewportSize({ width, height: 844 });
          positions += await page.evaluate(() => {
            const num = value => parseFloat(value) || 0;
            let checks = 0;
            for (const group of document.querySelectorAll('.platform-tabs,.segmented')) {
              for (const button of group.querySelectorAll('button')) {
                button.click();
                const css = getComputedStyle(group, '::before'), g = group.getBoundingClientRect(), b = button.getBoundingClientRect();
                const left = g.left + num(getComputedStyle(group).borderLeftWidth) + num(css.left) + new DOMMatrix(css.transform).m41;
                if (Math.abs(left - b.left) > .15 || Math.abs(left + num(css.width) - b.right) > .15) throw Error('Furina slider edge mismatch');
                checks++;
              }
            }
            return checks;
          });
        }
      }
      for (const style of oldStyles) {
        await page.evaluate(style => document.querySelector('[data-style-choice=' + style + ']').click(), style);
        for (const selector of ['.furina-scene', '.furina-backdrop', '.furina-credit']) assert.equal(await page.locator(selector).isVisible(), false);
      }
      await page.evaluate(() => document.querySelector('[data-style-choice=furina]').click());
      await page.locator('#close-settings').click();
    }
    for (const mode of ['remote-fails', 'all-fail', 'remote-stalls']) {
      const failure = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      if (mode === 'remote-stalls') await failure.clock.install();
      await failure.route(art, route => mode === 'remote-stalls' ? undefined : route.abort());
      if (mode === 'all-fail') await failure.route('**/assets/themes/furina/artwork.png', route => route.abort());
      await failure.goto(base + '/');
      await failure.evaluate(() => document.querySelector('[data-style-choice=furina]').click());
      if (mode === 'remote-stalls') await failure.clock.fastForward(8100);
      if (mode === 'all-fail') {
        await failure.locator('.furina-scene.is-unavailable').waitFor({ state: 'attached' });
        await failure.locator('.furina-backdrop.is-unavailable').waitFor({ state: 'attached' });
      } else await failure.waitForFunction(() => [...document.querySelectorAll('.furina-scene img,.furina-backdrop img')].every(img => img.complete && img.naturalWidth && img.currentSrc.includes('/assets/themes/furina/')));
      await failure.evaluate(() => document.querySelector('[data-style-choice=classic]').click());
      assert.equal(await failure.locator('.furina-scene').isVisible(), false);
      await failure.close();
    }
    await page.goto(base + '/');
    await page.evaluate(() => { document.querySelector('[data-language="zh-CN"]').click(); document.querySelector('[data-mode=dark]').click(); });
    await page.screenshot({ path: '/tmp/furina-mobile.png' });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({ path: '/tmp/furina-desktop.png', fullPage: true });
    await page.goto(base + '/genshin-download.html');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => document.querySelector('[data-mode=light]').click());
    await page.locator('[data-platform=ios]').click();
    await page.screenshot({ path: '/tmp/furina-download-light.png', fullPage: true });
    assert.deepEqual(errors, []);
    console.log('PASS Furina: option order; domestic/lazy artwork; 17 pages, 4 widths, 4 languages;', positions, 'slider positions; all failure modes; screenshots');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
