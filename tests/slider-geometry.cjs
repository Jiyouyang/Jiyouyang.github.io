/* A local server must be running. Measures indicator edges, not just page overflow. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://127.0.0.1:8765';
const pages = fs.readdirSync(path.join(__dirname, '..')).filter(file => file.endsWith('.html'));
// Optional comma-separated pages for resuming an interrupted long run; default tests every page.
const selectedPages = process.argv[3] ? process.argv[3].split(',') : pages;
assert.ok(selectedPages.length && selectedPages.every(file => pages.includes(file)), 'Unknown page selection');

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  let measured = 0;
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    await page.route('https://i0.hdslb.com/**', route => route.fulfill({ path: 'assets/themes/mahiro/portrait.jpg', contentType: 'image/jpeg' }));
    await page.route('https://c-ssl.dtstatic.com/**', route => route.fulfill({ path: 'assets/themes/mahiro/background.jpg', contentType: 'image/jpeg' }));
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const file of selectedPages) {
      await page.goto(base + '/' + file);
      await page.locator('#settings-trigger').click();
      for (const style of ['classic', 'terminal', 'mecha', 'blackgold', 'columbina', 'mahiro']) {
        await page.locator('[data-style-choice=' + style + ']').click();
        for (const width of [320, 390, 768, 1440]) {
          await page.setViewportSize({ width, height: 844 });
          for (const language of ['zh-CN', 'zh-TW', 'en', 'ja']) {
            await page.evaluate(language => document.querySelector('[data-language="' + language + '"]').click(), language);
            const result = await page.evaluate(() => {
              const failures = [];
              let checks = 0;
              const number = value => parseFloat(value) || 0;
              for (const group of document.querySelectorAll('.platform-tabs, .segmented')) {
                const insets = [];
                for (const [index, button] of [...group.querySelectorAll('button')].entries()) {
                  button.click();
                  const css = getComputedStyle(group, '::before');
                  const parentCss = getComputedStyle(group);
                  const parent = group.getBoundingClientRect();
                  const target = button.getBoundingClientRect();
                  const borderWidth = number(css.borderLeftWidth) + number(css.borderRightWidth);
                  const outerWidth = number(css.width) + (css.boxSizing === 'border-box' ? 0 : borderWidth + number(css.paddingLeft) + number(css.paddingRight));
                  const left = parent.left + number(parentCss.borderLeftWidth) + number(css.left) + new DOMMatrix(css.transform).m41;
                  const right = left + outerWidth;
                  const mismatch = Math.max(Math.abs(left - target.left), Math.abs(right - target.right));
                  checks++;
                  if (mismatch > .12) failures.push({ group: group.className, index, mismatch, left, right, targetLeft: target.left, targetRight: target.right });
                  if (css.transitionDuration !== '0s') failures.push({ group: group.className, issue: 'reduced motion still animates' });
                  insets.push({ left: left - parent.left, right: parent.right - right });
                }
                if (Math.abs(insets[0].left - insets.at(-1).right) > .12) failures.push({ group: group.className, issue: 'unequal endpoint inset', insets });
              }
              // The home category selector uses active button backgrounds, not a pseudo-element.
              const filters = document.querySelector('.filters');
              if (filters) for (const button of filters.querySelectorAll('button')) {
                button.click();
                const p = filters.getBoundingClientRect(), b = button.getBoundingClientRect();
                checks++;
                if (b.left < p.left || b.right > p.right || b.top < p.top || b.bottom > p.bottom) failures.push({ group: 'filters', issue: 'active button outside track' });
              }
              return { failures, checks };
            });
            measured += result.checks;
            assert.deepEqual(result.failures, [], [file, style, width, language].join(' '));
          }
        }
      }
      console.log('PASS', file);
    }
    // Also check the settled animated state, without the reduced-motion shortcut.
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(base + '/genshin-download.html');
    await page.locator('[data-platform=windows]').click();
    await page.waitForTimeout(450);
    const animation = await page.locator('.platform-tabs').evaluate(group => {
      const css = getComputedStyle(group, '::before'), rect = group.getBoundingClientRect(), target = group.querySelector('button:last-child').getBoundingClientRect();
      const left = rect.left + parseFloat(getComputedStyle(group).borderLeftWidth) + parseFloat(css.left) + new DOMMatrix(css.transform).m41;
      return { leftError: Math.abs(left - target.left), rightError: Math.abs(left + parseFloat(css.width) - target.right) };
    });
    assert.ok(animation.leftError < .12 && animation.rightError < .12, JSON.stringify(animation));
    assert.deepEqual(errors, []);
    console.log('PASS', measured, 'indicator/category positions across', selectedPages.length, 'pages, 6 styles, 4 widths and 4 languages; animation endpoints and reduced motion');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
