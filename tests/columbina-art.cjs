/* Verify lazy artwork, framing, credits and failure fallback against a local server. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
const { selectStyle, openSettings, closeSettings, selectSetting } = require('./select-style.cjs');
const base = process.argv[2] || 'http://127.0.0.1:8765';

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const artRequests = [];
    page.on('request', request => { if (request.url().includes('/assets/themes/columbina/')) artRequests.push(request.url()); });
    await page.goto(base + '/');
    await openSettings(page);
    for (const style of ['terminal', 'mecha', 'blackgold', 'classic']) await selectStyle(page, '[data-style-choice=' + style + ']');
    assert.deepEqual(artRequests, [], 'Existing styles must not download the character image');
    await selectStyle(page, '[data-style-choice=columbina]');
    await closeSettings(page);
    await page.locator('.columbina-scene img').evaluate(image => image.decode());
    assert.ok(artRequests.length > 0);
    for (const file of fs.readdirSync('.').filter(file => file.endsWith('.html'))) {
      await page.goto(base + '/' + file);
      assert.equal(await page.locator('.columbina-scene').count(), 1);
      await page.locator('.columbina-scene img').evaluate(image => image.decode());
      assert.equal(await page.locator('.columbina-scene img').evaluate(image => image.naturalWidth), 1024);
      assert.equal(await page.locator('.columbina-credit a').getAttribute('href'), 'https://www.miyoushe.com/ys/article/71350081');
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 844 });
        const layout = await page.evaluate(() => {
          const art = document.querySelector('.columbina-scene').getBoundingClientRect();
          const title = document.querySelector('.hero h1').getBoundingClientRect();
          const overlap = art.left < title.right && art.right > title.left && art.top < title.bottom && art.bottom > title.top;
          return { overlap, overflow: document.documentElement.scrollWidth > innerWidth };
        });
        assert.deepEqual(layout, { overlap: false, overflow: false }, file + ' at ' + width);
      }
      await openSettings(page);
      for (const language of ['zh-CN', 'zh-TW', 'en', 'ja']) {
        await selectSetting(page, '[data-language="' + language + '"]');
        assert.match(await page.locator('.columbina-credit').textContent(), /米游社|米遊社|Miyoushe/);
      }
      for (const style of ['classic', 'terminal', 'mecha', 'blackgold']) {
        await selectStyle(page, '[data-style-choice=' + style + ']');
        assert.equal(await page.locator('.columbina-scene').isVisible(), false);
        assert.equal(await page.locator('.columbina-credit').isVisible(), false);
      }
      await selectStyle(page, '[data-style-choice=columbina]');
    }
    // Failed artwork leaves a decorative crescent; content and settings still work.
    const fallback = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await fallback.route('**/assets/themes/columbina/character.png', route => route.abort());
    await fallback.goto(base + '/');
    await openSettings(fallback);
    await selectStyle(fallback, '[data-style-choice=columbina]');
    await fallback.locator('.columbina-scene.is-unavailable').waitFor({ state: 'attached' });
    await selectStyle(fallback, '[data-style-choice=classic]');
    assert.equal(await fallback.locator('html').getAttribute('data-style'), 'classic');
    console.log('PASS: 17 pages, 4 widths, artwork framing/credits, no art requests in other styles, switching and failed-image fallback');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
