/* Verify actual requested origins, lazy imagery, responsive framing and CDN/local failure handling.
   Normal tests supply archived bytes for deterministic geometry; --live also probes the real CDN. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://127.0.0.1:8765';
const portrait = 'https://i0.hdslb.com/bfs/article/156c825e518568b4ca2b44ef21340d30b889d54d.jpg';
const background = 'https://c-ssl.dtstatic.com/uploads/blog/202303/14/20230314024504_f75b6.thumb.1000_0.jpg';
const paths = ['assets/themes/mahiro/portrait.jpg', 'assets/themes/mahiro/background.jpg'];
const oldStyles = ['classic', 'terminal', 'mecha', 'blackgold', 'columbina'];

(async () => {
  // Optional narrowly scoped trust for a managed test environment's proxy CA.
  // Never disable certificate verification globally or alter website TLS handling.
  const args = ['--no-sandbox'];
  if (process.env.CHROMIUM_TRUSTED_SPKI) args.push('--ignore-certificate-errors-spki-list=' + process.env.CHROMIUM_TRUSTED_SPKI);
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const requests = [], errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {
      if ([portrait, background].includes(request.url()) || request.url().includes('/assets/themes/mahiro/')) requests.push(request.url());
    });
    if (!process.argv.includes('--live')) for (const [i, url] of [portrait, background].entries()) {
      await page.route(url, route => {
        assert.equal(route.request().headers().referer, undefined, 'CDN request must not send a cross-site referrer');
        return route.fulfill({ path: paths[i], contentType: 'image/jpeg' });
      });
    }
    await page.goto(base + '/');
    await page.locator('#settings-trigger').click();
    for (const style of oldStyles) await page.locator('[data-style-choice=' + style + ']').click();
    assert.deepEqual(requests, [], 'Other styles must not request Mahiro imagery');
    await page.locator('[data-style-choice=mahiro]').click();
    await page.locator('#close-settings').click();
    await page.waitForFunction(() => [...document.querySelectorAll('.mahiro-scene img,.mahiro-backdrop img')].every(img => img.complete && img.naturalWidth));
    assert.ok(requests.includes(portrait) && requests.includes(background));
    if (process.argv.includes('--live')) {
      assert.equal(await page.locator('.mahiro-scene img').evaluate(img => img.currentSrc), portrait, 'Live CDN portrait failed or timed out');
      assert.equal(await page.locator('.mahiro-backdrop img').evaluate(img => img.currentSrc), background, 'Live CDN background failed or timed out');
      console.log('PASS live domestic CDN image loads (current environment, not a mainland-network guarantee)');
    }

    for (const file of fs.readdirSync('.').filter(file => file.endsWith('.html'))) {
      await page.goto(base + '/' + file);
      await page.waitForFunction(() => [...document.querySelectorAll('.mahiro-scene img,.mahiro-backdrop img')].every(img => img.complete && img.naturalWidth));
      assert.equal(await page.locator('.mahiro-scene').count(), 1);
      assert.equal(await page.locator('.mahiro-scene img').evaluate(img => img.naturalWidth), 1193);
      assert.equal(await page.locator('.mahiro-backdrop img').evaluate(img => img.naturalWidth), 1000);
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 844 });
        const layout = await page.evaluate(() => {
          const art = document.querySelector('.mahiro-scene').getBoundingClientRect();
          const title = document.querySelector('.hero h1').getBoundingClientRect();
          return { overlap: art.left < title.right && art.right > title.left && art.top < title.bottom && art.bottom > title.top, overflow: document.documentElement.scrollWidth > innerWidth };
        });
        assert.deepEqual(layout, { overlap: false, overflow: false }, file + ' at ' + width);
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator('#settings-trigger').click();
      for (const language of ['zh-CN', 'zh-TW', 'en', 'ja']) {
        await page.locator('[data-language="' + language + '"]').click();
        assert.match(await page.locator('.mahiro-credit').textContent(), /哔哩哔哩|嗶哩嗶哩|Bilibili|bilibili/);
        assert.equal(await page.locator('.mahiro-credit a').count(), 2);
      }
      for (const style of oldStyles) {
        await page.locator('[data-style-choice=' + style + ']').click();
        for (const selector of ['.mahiro-scene', '.mahiro-backdrop', '.mahiro-credit']) assert.equal(await page.locator(selector).isVisible(), false);
      }
      await page.locator('[data-style-choice=mahiro]').click();
    }
    // Cover both failures and a hung CDN, not merely a successful image decode.
    for (const mode of ['remote-fails', 'all-fail', 'remote-stalls']) {
      const failure = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      if (mode === 'remote-stalls') await failure.clock.install();
      for (const url of [portrait, background]) await failure.route(url, route => mode === 'remote-stalls' ? undefined : route.abort());
      if (mode === 'all-fail') await failure.route('**/assets/themes/mahiro/*.jpg', route => route.abort());
      await failure.goto(base + '/');
      await failure.locator('#settings-trigger').click();
      await failure.locator('[data-style-choice=mahiro]').click();
      if (mode === 'remote-stalls') await failure.clock.fastForward(8100);
      if (mode === 'all-fail') {
        await failure.locator('.mahiro-scene.is-unavailable').waitFor({ state: 'attached' });
        await failure.locator('.mahiro-backdrop.is-unavailable').waitFor({ state: 'attached' });
      } else {
        await failure.waitForFunction(() => [...document.querySelectorAll('.mahiro-scene img,.mahiro-backdrop img')].every(img => img.complete && img.naturalWidth && img.currentSrc.includes('/assets/themes/mahiro/')));
      }
      await failure.locator('[data-style-choice=classic]').click();
      assert.equal(await failure.locator('.mahiro-scene').isVisible(), false);
      await failure.close();
    }
    // Representative visual review artifacts; not deployed.
    await page.goto(base + '/');
    await page.locator('#settings-trigger').click();
    await page.locator('[data-language="zh-CN"]').click();
    await page.locator('[data-mode=light]').click();
    await page.locator('#close-settings').click();
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: '/tmp/mahiro-mobile-fold.png' });
    await page.screenshot({ path: '/tmp/mahiro-mobile.png', fullPage: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({ path: '/tmp/mahiro-desktop.png', fullPage: true });
    await page.goto(base + '/genshin-download.html');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#settings-trigger').click();
    await page.locator('[data-mode=dark]').click();
    await page.locator('#close-settings').click();
    await page.locator('[data-platform=windows]').click();
    await page.screenshot({ path: '/tmp/mahiro-download-dark.png', fullPage: true });
    assert.deepEqual(errors, []);
    console.log('PASS Mahiro artwork: 17 pages, 4 widths, 4 languages, lazy loading, other-style isolation, both failures, timeout fallback');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
