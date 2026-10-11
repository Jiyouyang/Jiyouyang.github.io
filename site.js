/* Progressive interaction layer shared by all public pages. */
(() => {
  'use strict';
  const root = document.documentElement;
  const query = selector => document.querySelector(selector);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const labels = {
    'zh-CN': { skip:'跳到主要内容', clear:'清空搜索', resetSearch:'清空搜索与筛选', top:'回到顶部', preview:'外观预览', sample:'你的下一次发现。', reset:'恢复默认设置', pause:'暂停公告轮播', play:'继续公告轮播' },
    'zh-TW': { skip:'跳至主要內容', clear:'清除搜尋', resetSearch:'清除搜尋與篩選', top:'回到頂部', preview:'外觀預覽', sample:'你的下一次發現。', reset:'恢復預設設定', pause:'暫停公告輪播', play:'繼續公告輪播' },
    en: { skip:'Skip to content', clear:'Clear search', resetSearch:'Clear search and filters', top:'Back to top', preview:'Appearance preview', sample:'Your next discovery.', reset:'Restore defaults', pause:'Pause announcements', play:'Resume announcements' },
    ja: { skip:'本文へ移動', clear:'検索をクリア', resetSearch:'検索と絞り込みを解除', top:'ページの先頭へ', preview:'外観プレビュー', sample:'次の発見を、ここから。', reset:'初期設定に戻す', pause:'お知らせの切り替えを一時停止', play:'お知らせの切り替えを再開' }
  };
  const text = key => (labels[root.lang] || labels['zh-CN'])[key];
  const icon = path => '<svg viewBox="0 0 24 24" aria-hidden="true">' + path + '</svg>';
  const closeIcon = icon('<path d="m7 7 10 10M17 7 7 17"/>');
  const appleIcon = icon('<path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.47 7.59 9.01 7.31c1.35.07 2.29.75 3.08.8 1.18-.24 2.31-.94 3.57-.85 1.51.12 2.65.72 3.4 1.8-3.12 1.88-2.38 6 .48 7.16-.57 1.51-1.31 3.01-2.49 4.07ZM12.03 6.6c-.15-2.24 1.67-4.09 3.76-4.27.29 2.58-2.35 4.5-3.76 4.27Z"/>');
  const createButton = (className, key, markup) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    if (markup) { button.innerHTML = markup; button.dataset.uiLabel = key; }
    else button.dataset.ui = key;
    return button;
  };

  function syncLabels() {
    document.querySelectorAll('[data-ui]').forEach(element => { element.textContent = text(element.dataset.ui); });
    document.querySelectorAll('[data-ui-label]').forEach(element => {
      const label = text(element.dataset.uiLabel);
      element.setAttribute('aria-label', label);
      element.title = label;
    });
    const trigger = query('#settings-trigger');
    trigger.title = trigger.getAttribute('aria-label');
    const back = query('.back');
    if (back) back.setAttribute('aria-label', back.textContent.trim());
    query('meta[name="theme-color"]').content = root.dataset.theme === 'dark' ? '#080809' : '#f5f5f7';
    updateFilterIndicator();
  }

  // A single visible tab stop with arrow/Home/End key navigation for each tablist.
  const tabs = [...document.querySelectorAll('[data-platform]')];
  const panel = query('.download-card');
  if (tabs.length && panel) {
    const tablist = query('.platform-tabs');
    tablist.style.setProperty('--items', tabs.length);
    panel.id = 'download-panel';
    panel.setAttribute('role', 'tabpanel');
    panel.tabIndex = 0;
    let panelAnimation;
    const syncTabs = (animate = false) => {
      const selected = tabs.find(button => button.getAttribute('aria-selected') === 'true') || tabs[0];
      tabs.forEach(button => { button.tabIndex = button === selected ? 0 : -1; });
      panel.setAttribute('aria-labelledby', selected.id);
      upgradeAppleIcons();
      if (animate && !reducedMotion.matches) {
        panelAnimation?.cancel();
        panelAnimation = query('.download-content').animate([
          { opacity:.4, transform:'translateY(5px)' },
          { opacity:1, transform:'translateY(0)' }
        ], { duration:220, easing:'ease-out' });
      }
    };
    tabs.forEach((button, index) => {
      button.type = 'button';
      button.id = 'platform-tab-' + button.dataset.platform;
      button.setAttribute('aria-controls', panel.id);
      button.addEventListener('click', () => {
        history.replaceState(null, '', location.pathname + location.search + '#' + button.dataset.platform);
        syncTabs(true);
      });
      button.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        tabs[next].click();
        tabs[next].focus({ preventScroll:true });
      });
    });
    const fromHash = () => {
      const button = tabs.find(item => '#' + item.dataset.platform === location.hash);
      if (button) button.click();
    };
    fromHash();
    addEventListener('hashchange', fromHash);
    syncTabs();
  }

  // Preserve the outlined Apple design without relying on an Apple-only font glyph.
  function upgradeAppleIcons() {
    document.querySelectorAll('.apple-symbol,.tab-apple').forEach(element => {
      const holder = document.createElement('span');
      holder.innerHTML = appleIcon;
      element.replaceWith(holder.firstElementChild);
    });
  }
  upgradeAppleIcons();
  if (query('#platform-art')) new MutationObserver(upgradeAppleIcons).observe(query('#platform-art'), { childList:true });

  // A real cog silhouette, shared by every settings trigger.
  const gearPoints = [];
  for (let tooth = 0; tooth < 8; tooth++) {
    [0, .15, .32, .68, .85, 1].forEach((fraction, index) => {
      const angle = (tooth + fraction) * Math.PI / 4;
      const radius = index === 2 || index === 3 ? 10 : 8;
      gearPoints.push((12 + Math.cos(angle) * radius).toFixed(2) + ',' + (12 + Math.sin(angle) * radius).toFixed(2));
    });
  }
  query('#settings-trigger svg').innerHTML = '<polygon points="' + gearPoints.join(' ') + '"/><circle cx="12" cy="12" r="3"/>';

  const main = query('main');
  main.id ||= 'main-content';
  main.tabIndex = -1;
  const skip = document.createElement('a');
  skip.className = 'skip-link'; skip.href = '#' + main.id; skip.dataset.ui = 'skip';
  document.body.prepend(skip);
  const topButton = createButton('back-to-top glass icon', 'top', icon('<path d="m6 12 6-6 6 6M12 6v12"/>'));
  topButton.hidden = true;
  topButton.onclick = () => window.scrollTo({ top:0, behavior:reducedMotion.matches ? 'instant' : 'smooth' });
  document.body.append(topButton);
  const nav = query('.nav');
  let scrollFrame;
  addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      nav.classList.toggle('is-scrolled', scrollY > 24);
      topButton.hidden = scrollY < 650;
      scrollFrame = null;
    });
  }, { passive:true });

  const settings = query('#settings');
  const settingsTrigger = query('#settings-trigger');
  const preview = document.createElement('div');
  preview.className = 'settings-preview';
  preview.innerHTML = '<span class="preview-mark" aria-hidden="true">j</span><div><small data-ui="preview"></small><strong data-ui="sample"></strong></div>';
  query('.settings-body').prepend(preview);
  const reset = createButton('settings-reset', 'reset');
  query('.settings-body').append(reset);
  reset.onclick = () => {
    // Invoke existing page handlers without synthesizing a backdrop click at (0, 0).
    ['[data-accent-choice="graphite"]', '[data-mode="auto"]', '[data-language="zh-CN"]'].forEach(selector => query(selector).onclick());
  };
  settingsTrigger.setAttribute('aria-haspopup', 'dialog');
  settingsTrigger.setAttribute('aria-controls', 'settings');
  let savedScroll = 0;
  let savedBodyStyle = '';
  settingsTrigger.onclick = () => {
    savedScroll = scrollY;
    savedBodyStyle = document.body.style.cssText;
    settings.showModal();
    document.body.style.position = 'fixed';
    document.body.style.top = -savedScroll + 'px';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    settingsTrigger.setAttribute('aria-expanded', 'true');
  };
  settings.addEventListener('close', () => {
    document.body.style.cssText = savedBodyStyle;
    window.scrollTo({ top:savedScroll, behavior:'instant' });
    settingsTrigger.setAttribute('aria-expanded', 'false');
    settingsTrigger.focus({ preventScroll:true });
  });
  settingsTrigger.setAttribute('aria-expanded', 'false');

  // Search stays inside the user's gesture so iOS can open its keyboard.
  const search = query('#search');
  let filterIndicator;
  function updateFilterIndicator() {
    if (!filterIndicator) return;
    const active = query('.filters button.active');
    if (!active) return;
    filterIndicator.style.width = active.offsetWidth + 'px';
    filterIndicator.style.transform = 'translateX(' + active.offsetLeft + 'px)';
  }
  if (search) {
    const clear = createButton('icon search-clear', 'clear', closeIcon);
    search.closest('.search').append(clear);
    clear.hidden = !search.value;
    const updateClear = () => { clear.hidden = !search.value; };
    search.addEventListener('input', updateClear);
    clear.onclick = () => { search.value = ''; search.dispatchEvent(new Event('input')); search.focus({ preventScroll:true }); };
    search.addEventListener('keydown', event => {
      if (event.key === 'Escape') { search.value = ''; search.dispatchEvent(new Event('input')); }
    });
    query('#search-jump').onclick = () => {
      search.focus({ preventScroll:true });
      const top = Math.max(0, scrollY + search.closest('.search').getBoundingClientRect().top - (nav.getBoundingClientRect().bottom + 24));
      history.replaceState(null, '', location.pathname + location.search + '#resources');
      window.scrollTo({ top, behavior:reducedMotion.matches ? 'instant' : 'smooth' });
    };
    document.addEventListener('keydown', event => {
      if (settings.open || event.target.closest('input,textarea,[contenteditable="true"]')) return;
      if (event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
        event.preventDefault(); query('#search-jump').click();
      }
    });
    const filters = query('.filters');
    filterIndicator = document.createElement('span');
    filterIndicator.className = 'filter-indicator';
    filterIndicator.setAttribute('aria-hidden', 'true');
    filters.prepend(filterIndicator);
    filters.classList.add('has-indicator');
    filters.addEventListener('click', updateFilterIndicator);
    new ResizeObserver(updateFilterIndicator).observe(filters);
    const grid = query('#resource-grid');
    grid.removeAttribute('aria-live');
    query('#count').setAttribute('role', 'status');
    const enhanceResults = () => {
      const empty = query('.empty');
      if (empty && !empty.querySelector('button')) {
        const resetSearch = createButton('download-button', 'resetSearch');
        resetSearch.textContent = text('resetSearch');
        resetSearch.onclick = () => {
          search.value = ''; updateClear(); query('[data-category="all"]').click(); search.focus({ preventScroll:true });
        };
        empty.append(resetSearch);
      }
    };
    new MutationObserver(enhanceResults).observe(grid, { childList:true });
    enhanceResults();
  }

  const announcement = query('.announcement');
  if (announcement) {
    window.JYAnnouncementPaused = false;
    const pause = createButton('announcement-toggle', 'pause', icon('<path d="M9 6v12M15 6v12"/>'));
    pause.setAttribute('aria-pressed', 'false');
    announcement.querySelector('summary').insertBefore(pause, query('.announcement-chevron'));
    pause.onclick = event => {
      event.preventDefault(); event.stopPropagation();
      window.JYAnnouncementPaused = !window.JYAnnouncementPaused;
      pause.dataset.uiLabel = window.JYAnnouncementPaused ? 'play' : 'pause';
      pause.setAttribute('aria-pressed', String(window.JYAnnouncementPaused));
      pause.innerHTML = window.JYAnnouncementPaused ? icon('<path d="m9 6 9 6-9 6Z"/>') : icon('<path d="M9 6v12M15 6v12"/>');
      syncLabels();
    };
  }

  new MutationObserver(syncLabels).observe(root, { attributes:true, attributeFilter:['lang', 'data-theme'] });
  syncLabels();
})();
