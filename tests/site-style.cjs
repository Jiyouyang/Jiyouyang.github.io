/* Run against a local static server: node tests/site-style.cjs [base URL] [terminal|mecha|blackgold|columbina]. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://127.0.0.1:8765';
const testedStyle = process.argv[3] || 'terminal';
assert.ok(['terminal', 'mecha', 'blackgold', 'columbina'].includes(testedStyle));
const initial = { style: testedStyle, ...{
  mecha: { theme: 'light', accent: 'orange' },
  terminal: { theme: 'dark', accent: 'green' },
  blackgold: { theme: 'dark', accent: 'orange' },
  columbina: { theme: 'light', accent: 'blue' }
}[testedStyle] };
const pages = fs.readdirSync(path.join(__dirname, '..')).filter(file => file.endsWith('.html'));
const problems = [];

async function snapshot(page) {
  return page.evaluate(() => {
    const selectors = ['.nav', '.hero', '.hero h1', '.featured-card', '.hub-card', '.resource-card', '.download-card', '.platform-art', '.platform-tabs', '.filters', '.search', 'footer'];
    const properties = ['backgroundColor', 'color', 'fontFamily', 'fontSize', 'borderRadius', 'padding', 'gap', 'boxShadow'];
    return Object.fromEntries(selectors.map(selector => {
      const element = document.querySelector(selector);
      if (!element) return [selector, null];
      const css = getComputedStyle(element);
      return [selector, Object.fromEntries(properties.map(property => [property, css[property]]))];
    }));
  });
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', colorScheme: 'light' });
    const page = await context.newPage();
    page.on('pageerror', error => problems.push(error.message));
    page.on('response', response => { if (response.status() >= 400) problems.push(response.url() + ': ' + response.status()); });
    const baseline = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', colorScheme: 'light' });
    await baseline.route('**/site-style.*', route => route.fulfill({ body: '', contentType: route.request().url().includes('.css') ? 'text/css' : 'text/javascript' }));

    // Classic visual parity, all page families, persistence, tabs and small screens.
    for (const file of pages) {
      await page.goto(base + '/' + file);
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await baseline.goto(base + '/' + file);
      assert.deepEqual(await snapshot(page), await snapshot(baseline), file + ': classic visuals changed');
      const links = await page.locator('main a').evaluateAll(elements => elements.map(element => element.href));
      await page.locator('#settings-trigger').click();
      await page.locator('[data-style-choice=' + testedStyle + ']').click();
      assert.equal(await page.locator('#settings').evaluate(element => element.open), true, file + ': dialog closed during switch');
      assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), initial);
      await page.locator('#close-settings').click();
      assert.deepEqual(await page.locator('main a').evaluateAll(elements => elements.map(element => element.href)), links, file + ': changed destinations');
      const url = page.url();
      for (const tab of await page.locator('[data-platform]').all()) {
        await tab.click();
        assert.equal(page.url(), url, file + ': platform navigated');
        assert.equal(await tab.getAttribute('aria-selected'), 'true');
        for (const href of await page.locator('.download-button:visible').evaluateAll(elements => elements.map(element => element.href))) assert.match(href, /^https:\/\//);
        if (['blackgold', 'columbina'].includes(testedStyle) && ['genshin-download.html', 'zzz-download.html', 'hsr-download.html', 'endfield-download.html'].includes(file)) {
          const buttons = await page.locator('.download-button:visible').evaluateAll(es => es.map(e => ({ background: getComputedStyle(e).backgroundColor, color: getComputedStyle(e).color, height: e.getBoundingClientRect().height, top: e.getBoundingClientRect().top })));
          if (buttons.length === 2) assert.deepEqual(buttons[0], buttons[1], file + ': equally important downloads changed hierarchy or alignment');
        }
      }
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 844 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, file + ': overflow at ' + width);
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.reload();
      assert.equal(await page.locator('html').getAttribute('data-style'), testedStyle, file + ': style not restored');
      console.log('PAGE PASS', file);
    }
    await baseline.close();

    // Per-style preference isolation across page navigation, plus global language.
    await page.goto(base + '/index.html');
    await page.locator('#settings-trigger').click();
    await page.locator('[data-style-choice=classic]').click();
    await page.locator('[data-accent-choice=blue]').click();
    await page.locator('[data-mode=light]').click();
    await page.locator('[data-style-choice=terminal]').click();
    await page.locator('[data-accent-choice=violet]').click();
    await page.locator('[data-mode=dark]').click();
    await page.locator('[data-language=en]').click();
    await page.goto(base + '/minecraft-mobile.html');
    assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { theme: 'dark', accent: 'violet', style: 'terminal' });
    await page.locator('#settings-trigger').click();
    assert.equal(await page.locator('#style-label').textContent(), 'Visual style');
    await page.locator('[data-style-choice=classic]').click();
    assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { theme: 'light', accent: 'blue', style: 'classic' });
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    await page.locator('[data-style-choice=terminal]').click();
    assert.equal(await page.locator('html').getAttribute('data-accent'), 'violet');
    console.log('PASS preference isolation and cross-page language');

    await page.locator('[data-style-choice=mecha]').click();
    assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { theme: 'light', accent: 'orange', style: 'mecha' });
    await page.locator('[data-accent-choice=green]').click();
    await page.goto(base + '/genshin-download.html');
    assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { theme: 'light', accent: 'green', style: 'mecha' });
    await page.locator('#settings-trigger').click();
    await page.locator('[data-style-choice=terminal]').click();
    assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { theme: 'dark', accent: 'violet', style: 'terminal' });
    await page.locator('[data-style-choice=classic]').click();
    assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { theme: 'light', accent: 'blue', style: 'classic' });
    await page.locator('[data-style-choice=mecha]').click();
    assert.equal(await page.locator('html').getAttribute('data-accent'), 'green');
    await page.locator('[data-style-choice=blackgold]').click();
    assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { theme: 'dark', accent: 'orange', style: 'blackgold' });
    await page.locator('[data-accent-choice=blue]').click();
    await page.goto(base + '/minecraft-download.html');
    assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { theme: 'dark', accent: 'blue', style: 'blackgold' });
    await page.locator('#settings-trigger').click();
    for (const [style, accent, theme] of [['classic', 'blue', 'light'], ['terminal', 'violet', 'dark'], ['mecha', 'green', 'light'], ['blackgold', 'blue', 'dark']]) {
      await page.locator('[data-style-choice=' + style + ']').click();
      assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { style, accent, theme });
    }
    await page.locator('[data-style-choice=columbina]').click();
    assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { theme: 'light', accent: 'blue', style: 'columbina' });
    await page.locator('[data-accent-choice=violet]').click();
    await page.locator('[data-mode=dark]').click();
    await page.goto(base + '/minecraft-mods.html');
    await page.locator('#settings-trigger').click();
    for (const [style, accent, theme] of [['classic', 'blue', 'light'], ['terminal', 'violet', 'dark'], ['mecha', 'green', 'light'], ['blackgold', 'blue', 'dark'], ['columbina', 'violet', 'dark']]) {
      await page.locator('[data-style-choice=' + style + ']').click();
      assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { style, accent, theme });
    }
    console.log('PASS all five styles keep independent preferences');

    await page.evaluate(() => {
      localStorage.setItem('jy-style', 'classic');
      localStorage.setItem('jy-style-classic', JSON.stringify({ accent: 'orange', theme: 'light' }));
      window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
    });
    assert.deepEqual(await page.evaluate(() => ({ ...document.documentElement.dataset })), { theme: 'light', accent: 'orange', style: 'classic' });
    await page.locator('[data-style-choice=terminal]').click();
    console.log('PASS back/forward cache preference restoration');

    // Palette contrast and translated settings for every accent/language/mode combination.
    for (const file of ['index.html', 'minecraft.html', 'minecraft-launchers.html', 'genshin-download.html', 'minecraft-seed.html']) {
      await page.goto(base + '/' + file);
      await page.locator('#settings-trigger').click();
      await page.locator('[data-style-choice=' + testedStyle + ']').click();
      for (const language of ['zh-CN', 'zh-TW', 'en', 'ja']) {
        await page.locator('[data-language="' + language + '"]').click();
        assert.equal(await page.locator('[data-style-text=mecha]').textContent(), { 'zh-CN': '科技', 'zh-TW': '科技', en: 'Technology', ja: 'テクノロジー' }[language]);
        assert.equal(await page.locator('[data-style-text=blackgold]').textContent(), { 'zh-CN': '黑金典藏', 'zh-TW': '黑金典藏', en: 'Black & Gold', ja: 'ブラック＆ゴールド' }[language]);
        assert.equal(await page.locator('[data-style-text=columbina]').textContent(), { 'zh-CN': '哥伦比娅', 'zh-TW': '哥倫比婭', en: 'Columbina', ja: 'コロンビーナ' }[language]);
        for (const mode of ['light', 'dark', 'auto']) for (const accent of ['graphite', 'blue', 'violet', 'green', 'orange']) {
          await page.evaluate(({ mode, accent }) => {
            document.querySelector('[data-mode="' + mode + '"]').click();
            document.querySelector('[data-accent-choice="' + accent + '"]').click();
          }, { mode, accent });
          const result = await page.evaluate(() => {
            const css = getComputedStyle(document.documentElement);
            const color = key => css.getPropertyValue(key).trim();
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = 1;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            function luminance(value) {
              ctx.fillStyle = value; ctx.fillRect(0, 0, 1, 1);
              const linear = Array.from(ctx.getImageData(0, 0, 1, 1).data).slice(0, 3).map(c => { c /= 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; });
              return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
            }
            function contrast(a, b) { const x = luminance(color(a)), y = luminance(color(b)); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
            const probe = document.createElement('span');
            probe.style.color = 'var(--accent)'; document.body.append(probe);
            const resolvedAccent = getComputedStyle(probe).color; probe.remove();
            const indicatorsMatch = [...document.querySelectorAll('.platform-tabs,.segmented')].every(e => getComputedStyle(e, '::before').backgroundColor === resolvedAccent);
            return { text: contrast('--ink', '--surface'), muted: contrast('--muted', '--surface'), accent: contrast('--accent', '--surface'), button: contrast('--on-accent', '--accent'), gold: color('--gold') ? contrast('--gold', '--surface') : null, pink: color('--moon-pink') ? contrast('--moon-pink', '--surface') : null, indicatorsMatch, meta: document.querySelector('meta[name="theme-color"]').content, bg: color('--bg'), label: document.querySelector('#style-label').textContent, overflowing: document.querySelector('.settings-body').scrollWidth > document.querySelector('.settings-body').clientWidth };
          });
          for (const key of ['text', 'muted', 'accent', 'button']) assert.ok(result[key] >= 4.5, [file, language, mode, accent, key, result[key]].join(' '));
          if (testedStyle === 'blackgold') {
            assert.ok(result.gold >= 4.5, 'gold label contrast');
            assert.ok(result.indicatorsMatch, file + ': shared styles overrode blackgold indicator color');
          }
          if (testedStyle === 'columbina') {
            assert.ok(result.pink >= 4.5, 'berry label contrast');
            assert.ok(result.indicatorsMatch, file + ': shared styles overrode columbina indicator color');
          }
          assert.equal(result.meta, result.bg);
          assert.equal(result.overflowing, false, file + ': settings overflow');
          assert.equal(result.label, { 'zh-CN': '风格调整', 'zh-TW': '風格調整', en: 'Visual style', ja: 'スタイル' }[language]);
        }
      }
      await page.locator('[data-mode=auto]').click();
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
      await page.emulateMedia({ colorScheme: 'light' });
      await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
      await page.locator('#close-settings').click();
      console.log('MATRIX PASS', file);
    }

    // Existing home search/filter/announcement interaction in the new style.
    await page.goto(base + '/index.html');
    await page.locator('#search-jump').click();
    assert.equal(await page.locator('#search').evaluate(element => element === document.activeElement), true);
    await page.locator('#search').fill('Minecraft');
    assert.equal(await page.locator('.resource-card').count(), 1);
    await page.locator('#search').fill('');
    await page.locator('[data-category=computer]').click();
    assert.equal(await page.locator('.resource-card').count(), 1);
    await page.locator('[data-category=all]').click();
    await page.locator('.announcement summary').click();
    assert.equal(await page.locator('.announcement').getAttribute('open'), '');
    assert.ok((await page.locator('#announcement-list').textContent()).includes('ターミナル'));

    // Storage denied must not break either style or navigation controls.
    const denied = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await denied.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } }); });
    const deniedPage = await denied.newPage();
    deniedPage.on('pageerror', error => problems.push('storage denied: ' + error.message));
    await deniedPage.goto(base + '/index.html');
    await deniedPage.locator('#settings-trigger').click();
    await deniedPage.locator('[data-style-choice=' + testedStyle + ']').click();
    await deniedPage.locator('[data-style-choice=classic]').click();
    assert.equal(await deniedPage.locator('html').getAttribute('data-style'), 'classic');
    await denied.close();
    assert.deepEqual(problems, []);
    console.log('PASS all 17 pages; classic parity; 300 ' + testedStyle + ' palette/language/mode combinations; search, tabs, storage and system theme');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
