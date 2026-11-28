const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { selectStyle, openSettings, selectSetting } = require('./select-style.cjs');
const base = process.argv[2] || 'http://127.0.0.1:8766';

(async () => {
  const args = ['--no-sandbox'];
  if (process.env.TRUSTED_PROXY_SPKI) args.push('--ignore-certificate-errors-spki-list=' + process.env.TRUSTED_PROXY_SPKI);
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args });
  try {
    const page = await browser.newPage({ viewport: { width: 320, height: 740 }, reducedMotion: 'reduce' });
    await page.route('https://patchwiki.biligame.com/**', route => route.fulfill({ path: 'assets/themes/furina/artwork.png', contentType: 'image/png' }));
    await page.goto(base + '/');
    assert.equal(await page.locator('#settings-trigger').isVisible(), false);
    await openSettings(page);
    assert.equal(await page.locator('[data-screen="set"] .style-setting').count(), 1);
    const toggle = page.locator('.style-picker-toggle');
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator('.style-choice:visible').count(), 0);
    assert.equal(await page.locator('.backdrop-setting').isVisible(), false);
    for (const [name, saved] of [['columbina', 'vivid'], ['furina', 'soft'], ['mtf', 'standard']]) {
      await selectStyle(page, '[data-style-choice=' + name + ']');
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      for (const mode of ['light', 'dark']) {
        await selectSetting(page, '[data-mode=' + mode + ']');
        const values = [];
        for (const level of ['soft', 'standard', 'vivid']) {
          await page.locator('[data-strength=' + level + ']').click();
          values.push(await page.evaluate(name => {
            const css = name === 'columbina' ? getComputedStyle(document.body, '::before') : getComputedStyle(document.querySelector('.' + name + '-backdrop'));
            return Number(css.opacity);
          }, name));
        }
        assert.ok(values[0] < values[1] && values[1] < values[2], name + '/' + mode + ': ' + values);
      }
      await page.locator('[data-strength=' + saved + ']').click();
    }
    await page.goto(base + '/genshin-download.html');
    await openSettings(page);
    for (const [name, saved] of [['columbina', 'vivid'], ['furina', 'soft'], ['mtf', 'standard']]) {
      await selectStyle(page, '[data-style-choice=' + name + ']');
      assert.equal(await page.locator('[data-strength=' + saved + ']').getAttribute('aria-pressed'), 'true');
    }
    for (const [language, title] of [['zh-CN', '背景浓度'], ['zh-TW', '背景濃度'], ['en', 'Background intensity'], ['ja', '背景の濃さ']]) {
      await selectSetting(page, '[data-language="' + language + '"]');
      assert.equal(await page.locator('#strength-label').textContent(), title);
      assert.ok(await toggle.evaluate(el => el.scrollWidth <= el.clientWidth));
    }
    await toggle.focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.style-choice:visible').count(), 8);
    await page.setViewportSize({ width: 1100, height: 800 });
    await openSettings(page);
    assert.equal(await page.locator('#settings[open] .settings-body').count(), 1);
    assert.equal(await toggle.isVisible(), false);
    assert.equal(await page.locator('.style-choice:visible').count(), 8);
    await selectStyle(page, '[data-style-choice=classic]');
    assert.equal(await page.locator('.backdrop-setting').isVisible(), false);
    console.log('PASS mobile disclosure, keyboard, desktop list, four languages and per-theme intensity across pages and modes');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
