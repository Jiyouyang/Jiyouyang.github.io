(() => {
  const trail = document.querySelector('.crumbs');
  const homeNames = { 'zh-CN': '首页', 'zh-TW': '首頁', en: 'Home', ja: 'ホーム' };
  const parentLink = trail.querySelector('[data-parent]');
  const parent = parentLink && window.JYCatalog.find(item => item.url === parentLink.getAttribute('href'));
  function update() {
    const lang = document.documentElement.lang;
    trail.querySelector('[data-path-home]').textContent = homeNames[lang] || homeNames['zh-CN'];
    if (parent) parentLink.textContent = (parent.content[lang] || parent.content['zh-CN'])[0];
    // Keep the current folder visible when a long path overflows on a phone.
    trail.scrollLeft = trail.scrollWidth;
  }
  update();
  new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  new ResizeObserver(() => { trail.scrollLeft = trail.scrollWidth; }).observe(trail);
})();
