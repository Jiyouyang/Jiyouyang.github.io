// Exercise the same disclosure that mobile visitors use before choosing a theme.
async function selectStyle(page, selector) {
  const toggle = page.locator('.style-picker-toggle');
  if (await toggle.isVisible() && await toggle.getAttribute('aria-expanded') === 'false') {
    await toggle.click();
  }
  await page.locator(selector).click();
}
const mobileSettings = '.jy-screen[data-screen="set"][data-pos="center"]';

async function openSettings(page) {
  if (await page.locator('#settings[open]').count()) return;
  await page.locator('#settings-trigger, [data-dock="set"]').first().waitFor({ state: 'attached' });
  const dock = page.locator('[data-dock="set"]');
  if (await dock.isVisible()) {
    if (await page.locator(mobileSettings).isVisible()) return;
    if (await page.locator('.jy-dock.away').count()) {
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    }
    await dock.click();
    await page.locator(mobileSettings).waitFor();
  } else {
    await page.locator('#settings-trigger').click();
  }
}

async function closeSettings(page) {
  if (await page.locator(mobileSettings).isVisible()) {
    await page.locator('[data-dock="home"]').click();
    await page.locator(mobileSettings).waitFor({ state: 'hidden' });
  } else {
    await page.locator('#close-settings').click();
  }
}
async function selectSetting(page, selector) {
  const button = page.locator(selector);
  const sheet = page.locator(mobileSettings);
  if (!(await sheet.isVisible())) {
    await button.click();
    return;
  }
  const proxy = await button.evaluate(element => {
    const controls = { 'data-mode': 'mode', 'data-accent-choice': 'accent', 'data-language': 'lang' };
    const attribute = Object.keys(controls).find(name => element.hasAttribute(name));
    const index = [...document.querySelectorAll('[' + attribute + ']')].indexOf(element);
    return controls[attribute] + ':' + index;
  });
  await sheet.locator('[data-proxy="' + proxy + '"]').click();
}
module.exports = { selectStyle, openSettings, closeSettings, selectSetting };
