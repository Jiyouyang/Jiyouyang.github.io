/* Compare existing styles with a pre-change Git revision; excludes the new settings option. */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://127.0.0.1:8765';
const revision = process.argv[3];
assert.ok(revision, 'Supply the pre-change Git revision as the third argument');
const old = Object.fromEntries(['scripts/site-style.js', 'styles/site-style.css', 'styles/mecha.css'].map(file => [file, execFileSync('git', ['show', revision + ':' + file], { encoding: 'utf8' })]));
const pages = fs.readdirSync(path.join(__dirname, '..')).filter(file => file.endsWith('.html'));

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    let comparisons = 0;
    for (const style of ['classic', 'terminal', 'mecha']) {
      const options = { viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' };
      const current = await browser.newContext(options), baseline = await browser.newContext(options);
      for (const context of [current, baseline]) await context.addInitScript(style => {
        localStorage.setItem('jy-style', style); localStorage.setItem('jy-theme', 'light'); localStorage.setItem('jy-accent', 'graphite');
      }, style);
      await baseline.route('**/site-style.*', route => {
        const file = new URL(route.request().url()).pathname.slice(1);
        return route.fulfill({ body: old[file], contentType: file.endsWith('.css') ? 'text/css' : 'text/javascript' });
      });
      await baseline.route('**/mecha.css*', route => route.fulfill({ body: old['styles/mecha.css'], contentType: 'text/css' }));
      await baseline.route('**/blackgold.css*', route => route.fulfill({ body: '', contentType: 'text/css' }));
      const a = await current.newPage(), b = await baseline.newPage();
      for (const file of pages) {
        await Promise.all([a.goto(base + '/' + file), b.goto(base + '/' + file)]);
        for (const theme of ['light', 'dark']) for (const accent of ['graphite', 'blue', 'violet', 'green', 'orange']) {
          const capture = page => page.evaluate(({ theme, accent }) => {
            document.querySelector('[data-mode="' + theme + '"]').click();
            document.querySelector('[data-accent-choice="' + accent + '"]').click();
            const properties = ['color', 'backgroundColor', 'border', 'borderRadius', 'fontFamily', 'fontSize', 'fontWeight', 'padding', 'margin', 'gap', 'boxShadow', 'transform'];
            const selectors = ['body','.nav','.hero','.hero h1','.hero-action','.featured-card','.hub-card','.hub-visual','.resource-card','.resource-visual','.download-card','.platform-art','.platform-tabs','.segmented','.filters','.search','.download-button','footer'];
            return Object.fromEntries(selectors.map(selector => {
              const element = document.querySelector(selector);
              if (!element) return [selector, null];
              const captureStyle = pseudo => { const css = getComputedStyle(element, pseudo); return Object.fromEntries(properties.map(property => [property, css[property]])); };
              return [selector, [captureStyle(null), captureStyle('::before')]];
            }));
          }, { theme, accent });
          const [actual, expected] = await Promise.all([capture(a), capture(b)]);
          assert.deepEqual(actual, expected, [file, style, theme, accent].join(' '));
          comparisons++;
        }
      }
      await current.close(); await baseline.close();
    }
    console.log('PASS', comparisons, 'page/style/palette comparisons: existing Classic, Terminal and Technology appearance unchanged');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
