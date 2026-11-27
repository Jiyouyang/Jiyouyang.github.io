/* JY//OS decorations are mounted only while its optional theme is active. */
(() => {
  const root = document.documentElement;
  let cleanup;
  function mount() {
    const hero = document.querySelector('#hero-top');
    let timer;
    let panel;
    if (hero) {
      const hud = document.createElement('aside');
      hud.className = 'hud';
      hud.setAttribute('aria-hidden', 'true');
      hud.innerHTML =
        '<div class="hud-head"><span class="hud-led"></span><span>SYS//STATUS</span><span class="hud-tag">ONLINE</span></div>' +
        '<dl class="hud-rows">' +
        '<div><dt>MODULES</dt><dd data-hud="modules">--</dd></div>' +
        '<div><dt>CATEGORIES</dt><dd data-hud="categories">04</dd></div>' +
        '<div><dt>LOCAL.TIME</dt><dd data-hud="time">--:--:--</dd></div>' +
        '<div><dt>THEME</dt><dd data-hud="theme">--</dd></div>' +
        '</dl><div class="hud-bars">' + '<i></i>'.repeat(26) + '</div>';
      hero.appendChild(hud);
      panel = hud;
      const clock = hud.querySelector('[data-hud="time"]');
      const palette = hud.querySelector('[data-hud="theme"]');
      const modules = hud.querySelector('[data-hud="modules"]');
      const categories = hud.querySelector('[data-hud="categories"]');
      function refresh() {
        clock.textContent = new Date().toTimeString().slice(0, 8);
        palette.textContent = (root.dataset.theme + ' / ' + (root.dataset.accent === 'graphite' ? 'cyan' : root.dataset.accent)).toUpperCase();
        modules.textContent = (document.querySelector('#resource-total')?.textContent || '0').padStart(2, '0');
        categories.textContent = String(document.querySelectorAll('.filters button').length - 1).padStart(2, '0');
      }
      refresh();
      timer = setInterval(refresh, 1000);
    }
    let previous;
    function move(event) {
      if (event.pointerType === 'touch') return;
      const card = event.target.closest?.('.resource-card,.hub-card,.featured-card,.download-card,.favorite-entry');
      if (!card) return;
      if (previous !== card) clear();
      previous = card;
      const box = card.getBoundingClientRect();
      card.style.setProperty('--mx', (event.clientX - box.left) + 'px');
      card.style.setProperty('--my', (event.clientY - box.top) + 'px');
    }
    function clear() {
      previous?.style.removeProperty('--mx');
      previous?.style.removeProperty('--my');
    }
    document.addEventListener('pointermove', move, { passive: true });
    return () => { document.removeEventListener('pointermove', move); clear(); clearInterval(timer); panel?.remove(); };
  }
  function sync() {
    if (root.dataset.style === 'tech') { if (!cleanup) cleanup = mount(); }
    else if (cleanup) { cleanup(); cleanup = null; }
  }
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-style'] });
  sync();
})();
