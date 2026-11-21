// Exercise the same disclosure that mobile visitors use before choosing a theme.
async function selectStyle(page, selector) {
  const toggle = page.locator('.style-picker-toggle');
  if (await toggle.isVisible() && await toggle.getAttribute('aria-expanded') === 'false') {
    await toggle.click();
  }
  await page.locator(selector).click();
}
module.exports = { selectStyle };
