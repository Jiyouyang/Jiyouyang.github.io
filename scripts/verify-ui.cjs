// Run against a local static server with Playwright Core and Chromium available.
const assert = require('node:assert/strict');
const { chromium } = require('playwright-core');
const base = process.env.SITE_BASE_URL || 'http://127.0.0.1:8765';
const pages = ['index.html', 'minecraft.html', 'genshin.html', 'minecraft-download.html', 'minecraft-mods.html', 'minecraft-launchers.html', 'minecraft-mobile.html', 'genshin-download.html'];
const languages = ['zh-CN', 'zh-TW', 'en', 'ja'];
const accents = ['graphite', 'blue', 'violet', 'green', 'orange'];

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  const errors = [];
  try {
    const context = await browser.newContext({ viewport: { width:390, height:844 }, reducedMotion:'reduce' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    const noOverflow = async label => {
      const result = await page.evaluate(() => ({ width:innerWidth, content:document.documentElement.scrollWidth }));
      assert(result.content <= result.width + 1, `${label}: horizontal overflow ${JSON.stringify(result)}`);
    };
    for (const file of pages) {
      await page.goto(base + '/' + file);
      await page.locator('#settings-trigger').click();
      assert(await page.locator('#settings').evaluate(dialog => dialog.open), file + ': settings did not open');
      for (const language of languages) {
        await page.locator(`[data-language="${language}"]`).click();
        assert.equal(await page.locator('html').getAttribute('lang'), language);
        await noOverflow(file + '/' + language);
      }
      await page.locator('[data-mode="dark"]').click();
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
      await page.locator('[data-accent-choice="blue"]').click();
      assert.equal(await page.locator('html').getAttribute('data-accent'), 'blue');
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => document.body.style.position !== 'fixed');
      assert(!(await page.locator('#settings').evaluate(dialog => dialog.open)), file + ': Escape did not close settings');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'settings-trigger');
      const tabs = page.locator('[data-platform]');
      for (let i = 0; i < await tabs.count(); i++) {
        const tab = tabs.nth(i);
        await tab.click();
        assert.equal(new URL(page.url()).pathname, '/' + file, file + ': a tab navigated');
        assert.equal(await tab.getAttribute('aria-selected'), 'true');
        assert((await page.locator('#download-link').getAttribute('href')).startsWith('https://'), file + ': missing download URL');
      }
      if (await tabs.count()) {
        await tabs.first().focus();
        await page.keyboard.press('ArrowRight');
        assert.equal(await tabs.nth(1).getAttribute('aria-selected'), 'true', file + ': keyboard tab selection');
        assert.equal(await page.locator('#download-panel').getAttribute('aria-labelledby'), await tabs.nth(1).getAttribute('id'));
        await page.reload();
        assert.equal(await tabs.nth(1).getAttribute('aria-selected'), 'true', file + ': shareable tab hash');
      }
      await noOverflow(file);
      for (const width of [320, 768, 1440]) {
        await page.setViewportSize({ width, height:900 });
        await noOverflow(file + '/' + width);
      }
      await page.setViewportSize({ width:390, height:844 });
      console.log('PASS', file, 'languages, settings, layout, tabs');
    }

    // All accent/light-dark combinations on the two shared component layouts.
    for (const file of ['index.html', 'genshin-download.html']) {
      await page.goto(base + '/' + file);
      await page.locator('#settings-trigger').click();
      for (const mode of ['light', 'dark']) {
        await page.locator(`[data-mode="${mode}"]`).click();
        for (const accent of accents) {
          await page.locator(`[data-accent-choice="${accent}"]`).click();
          assert.equal(await page.locator('html').getAttribute('data-accent'), accent);
          assert.equal(await page.locator(`[data-accent-choice="${accent}"]`).getAttribute('aria-pressed'), 'true');
          assert.equal(await page.locator('html').getAttribute('data-theme'), mode);
          await noOverflow(file + '/' + mode + '/' + accent);
        }
      }
      await page.locator('.settings-reset').click();
      assert.equal(await page.locator('html').getAttribute('lang'), 'zh-CN');
      assert.equal(await page.locator('html').getAttribute('data-accent'), 'graphite');
      assert.equal(await page.evaluate(() => localStorage.getItem('jy-theme')), 'auto');
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => document.body.style.position !== 'fixed');
    }

    await page.goto(base + '/');
    await page.locator('#search-jump').click();
    assert.equal(await page.evaluate(() => document.activeElement.id), 'search');
    await page.locator('#search').fill('no-such-resource-12345');
    await page.locator('.empty button').click();
    assert.equal(await page.locator('.resource-card').count(), 10);
    await page.locator('#search').fill('Minecraft');
    assert.equal(await page.locator('.resource-card').count(), 1);
    await page.locator('.search-clear').click();
    await page.locator('[data-category="games"]').click();
    assert.equal(await page.locator('.resource-card').count(), 3);
    const beforeOpen = await page.evaluate(() => scrollY);
    await page.locator('#settings-trigger').click();
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.body.style.position !== 'fixed');
    const afterClose = await page.evaluate(() => scrollY);
    assert(Math.abs(beforeOpen-afterClose) < 2, 'Settings changed scroll position');
    await page.locator('.brand').click();
    await page.locator('.announcement-toggle').click();
    assert.equal(await page.locator('.announcement-toggle').getAttribute('aria-pressed'), 'true');
    assert(!(await page.locator('#top').evaluate(details => details.open)), 'Pause toggled the announcement details');
    await page.locator('.announcement summary').click({ position:{ x:80, y:25 } });
    assert.equal(await page.locator('.announcement-entry').count(), 5);
    assert.deepEqual(errors, [], 'Browser JavaScript errors');
    console.log('PASS shared colors, search, reset, scroll restoration, announcements; no browser errors');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
