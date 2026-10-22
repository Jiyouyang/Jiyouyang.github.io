/* Regression for the observed duplicate filter, missing glyph and keyboard-only tab failures. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://127.0.0.1:8765';

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await context.route('https://i0.hdslb.com/**', route => route.fulfill({ path: 'assets/themes/mahiro/portrait.jpg', contentType: 'image/jpeg' }));
    await context.route('https://c-ssl.dtstatic.com/**', route => route.fulfill({ path: 'assets/themes/mahiro/background.jpg', contentType: 'image/jpeg' }));
    const page = await context.newPage(), errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/index.html');
    const destinations = await page.locator('.resource-card').evaluateAll(es => es.map(e => e.getAttribute('href')).sort());
    for (const language of ['zh-CN', 'zh-TW', 'en', 'ja']) {
      await page.evaluate(language => document.querySelector('[data-language="' + language + '"]').click(), language);
      const labels = await page.locator('[data-category]').allTextContents();
      assert.equal(new Set(labels).size, 5, 'Every category label must be distinct: ' + language);
      assert.equal(await page.locator('[data-category]').count(), 5);
      await page.locator('[data-category=tools]').click();
      assert.deepEqual(await page.locator('.resource-card').evaluateAll(es => es.map(e => e.getAttribute('href')).sort()),
        ['/computer-tools.html', 'https://caniuse.com/', 'https://jisho.org/'].sort());
      await page.locator('[data-category=all]').click();
      assert.deepEqual(await page.locator('.resource-card').evaluateAll(es => es.map(e => e.getAttribute('href')).sort()), destinations);
    }
    assert.equal(destinations.length, 14, 'All existing resources stay available');

    let downloadPages = 0;
    for (const file of fs.readdirSync('.').filter(file => file.endsWith('.html'))) {
      await page.goto(base + '/' + file);
      const tabs = page.locator('.platform-tabs [role=tab]');
      const count = await tabs.count();
      if (!count) continue;
      downloadPages++;
      const url = page.url();
      await tabs.first().click();
      const platforms = await tabs.evaluateAll(es => es.map(e => e.dataset.platform));
      const expectTab = async index => {
        assert.equal(await page.locator('[data-platform].active').getAttribute('data-platform'), platforms[index], file);
        assert.equal(await page.evaluate(() => document.activeElement.dataset.platform), platforms[index], file + ': focus');
        assert.equal(await page.locator('.platform-tabs [role=tab][tabindex="0"]').count(), 1);
        assert.equal(page.url(), url, 'Keyboard selection must not navigate');
      };
      for (const [key, index] of [['ArrowRight', 1], ['End', count - 1], ['ArrowRight', 0], ['ArrowLeft', count - 1], ['Home', 0]]) {
        await page.keyboard.press(key);
        await expectTab(index);
        assert.ok(await page.locator('.download-button:visible').count());
      }
      await tabs.last().click();
      await page.waitForFunction(() => document.querySelector('[data-platform].active').tabIndex === 0);
      assert.equal(await page.locator('[data-platform].active').getAttribute('data-platform'), platforms.at(-1));
      assert.equal(await page.locator('html').evaluate(el => el.scrollWidth > innerWidth), false);
    }
    assert.equal(downloadPages, 9);

    // Rendering evidence uses the actual browser font, not just a declared CSS family.
    await page.goto(base + '/genshin-download.html');
    await page.locator('[data-platform=ios]').click();
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('.tab-apple').textContent(), '\uF8FF');
    assert.equal(await page.locator('.apple-symbol').textContent(), '\uF8FF');
    const session = await context.newCDPSession(page);
    await session.send('DOM.enable'); await session.send('CSS.enable');
    const { root } = await session.send('DOM.getDocument');
    for (const selector of ['.tab-apple', '.apple-symbol']) {
      const { nodeId } = await session.send('DOM.querySelector', { nodeId: root.nodeId, selector });
      const { fonts } = await session.send('CSS.getPlatformFontsForNode', { nodeId });
      assert.ok(fonts.some(font => font.glyphCount && (font.isCustomFont || /Apple|SF/.test(font.familyName))), selector + ': no Apple or fallback glyph rendered');
      assert.ok(await page.locator(selector).evaluate(el => parseFloat(getComputedStyle(el).webkitTextStrokeWidth) > 0));
    }
    for (const style of ['classic', 'terminal', 'mecha', 'blackgold', 'columbina', 'mahiro']) {
      await page.evaluate(style => document.querySelector('[data-style-choice=' + style + ']').click(), style);
      for (const width of [320, 390]) {
        await page.setViewportSize({ width, height: 844 });
        assert.equal(await page.locator('html').evaluate(el => el.scrollWidth > innerWidth), false, style);
      }
    }
    await page.locator('.platform-tabs').screenshot({ path: '/tmp/fixed-ios-tabs.png' });
    await page.locator('#platform-art').screenshot({ path: '/tmp/fixed-ios-art.png' });
    assert.deepEqual(errors, []);
    console.log('PASS four-language unified Tools; all 14 resources; 9 keyboard tablists; mouse/keyboard sync; native-character outline with actual fallback glyph; 6 theme layouts');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
