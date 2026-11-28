const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
const { selectStyle, openSettings, selectSetting } = require('./select-style.cjs');
const base = process.argv[2] || 'http://127.0.0.1:8767';
(async () => {
  const args = ['--no-sandbox'];
  if (process.env.TRUSTED_PROXY_SPKI) args.push('--ignore-certificate-errors-spki-list=' + process.env.TRUSTED_PROXY_SPKI);
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args });
  try {
    const page = await browser.newPage({ viewport: { width: 320, height: 780 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base);
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    assert.equal(await page.locator('.hud').count(), 1);
    assert.equal(await page.locator('.jy-ink').count(), 2);
    const favorite = page.locator('#resource-grid [data-library-action="favorite"][data-entry-id="avatar-studio"]');
    await favorite.click();
    assert.equal(await page.evaluate(() => localStorage.getItem('jy-recent')), null);
    await page.locator('#favorites-grid a[href="/avatar.html"]').focus();
    await Promise.all([page.waitForURL('**/avatar.html'), page.keyboard.press('Enter')]);
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('jy-recent'))), ['avatar-studio']);
    await page.goto(base);
    for (const filter of await page.locator('.filters [data-category]').all()) {
      await filter.click();
      assert.equal(Number(await filter.getAttribute('data-n')), await page.locator('#resource-grid a.resource-card').count());
      await page.waitForFunction(() => {
        const ink = document.querySelector('.filters .jy-ink').getBoundingClientRect();
        const active = document.querySelector('.filters .active').getBoundingClientRect();
        return Math.abs(ink.x - active.x) < 1 && Math.abs(ink.y - active.y) < 1;
      });
    }
    await page.evaluate(() => scrollTo({top: 0, behavior: 'instant'}));
    await page.locator('[data-dock=search]').click();
    assert.ok(await page.locator('main').evaluate(main => main.inert));
    await page.locator('[data-screen=search] input').fill('minecraft');
    assert.ok(await page.locator('[data-screen=search] a.jp-item').count() > 0);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.documentElement.classList.contains('jy-screen-open'));
    assert.equal(await page.locator('main').evaluate(main => main.inert), false);
    await page.keyboard.press('?');
    assert.equal(await page.locator('#jy-help').isVisible(), true);
    await page.keyboard.press('Escape');
    await openSettings(page);
    assert.equal(await page.locator('[data-style-choice]').first().getAttribute('data-style-choice'), 'tech');
    await selectStyle(page, '[data-style-choice=classic]');
    assert.equal(await page.locator('.hud').count(), 0);
    assert.equal(await page.locator('.jy-cmd').count(), 1);
    assert.equal(await page.locator('.jy-ink').count(), 2);
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('data-style'), 'classic');
    await openSettings(page);
    await selectStyle(page, '[data-style-choice=tech]');
    await selectSetting(page, '[data-mode=light]');
    const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 820 });
      for (const file of files) {
        await page.goto(base + '/' + file, {waitUntil:'domcontentloaded'});
        assert.equal(await page.locator('html').getAttribute('data-style'), 'tech', file);
        assert.equal(await page.locator('html').getAttribute('data-theme'), 'light', file);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), file + '/' + width + ' overflow');
      }
    }
    await page.goto(base + '/genshin-download.html');
    assert.ok(await page.locator('.jy-ctl #settings-trigger').isVisible());
    await page.locator('[data-platform=ios]').click();
    const card = page.locator('#platform-description');
    await card.evaluate(target => {
      function swipe(type, x) {
        const touch = new Touch({ identifier: 1, target, clientX: x, clientY: 200 });
        target.dispatchEvent(new TouchEvent(type, { bubbles: true, touches: type === 'touchstart' ? [touch] : [], changedTouches: [touch] }));
      }
      swipe('touchstart', 220);
      swipe('touchend', 125);
    });
    assert.equal(await page.locator('[data-platform=windows]').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('[data-platform=windows]').getAttribute('data-key'), '3');
    assert.match(await page.locator('.download-button:visible').first().getAttribute('href'), /hoyoplay\.hoyoverse\.com/);
    assert.equal(new URL(page.url()).hash, '#windows');
    await page.goto(base + '/genshin-download.html');
    assert.equal(await page.locator('[data-platform=windows]').getAttribute('aria-selected'), 'true');
    await page.keyboard.press('Control+k');
    assert.equal(await page.locator('#jy-palette').isVisible(), true);
    assert.deepEqual(errors, []);
    console.log('PASS JY//OS default, picker order, preference persistence, HUD lifecycle, Windows download and widths on ' + files.length + ' pages');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
