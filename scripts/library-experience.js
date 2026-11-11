/* Favorites, resource metadata, quick search and small interactions.
   No account or network service: user preferences stay in this browser. */
(() => {
  'use strict';
  const catalog = window.JYCatalog;
  const byId = new Map(catalog.map(item => [item.id, item]));
  const byURL = new Map(catalog.map(item => [new URL(item.url, location.href).href, item]));
  const words = {
    'zh-CN': {
      favorites: '我的常用', favoritesHint: '收藏常用入口，下次直接找到。', local: '保存在当前浏览器，不跨设备同步。', temporary: '浏览器未允许保存，当前页面仍可使用。',
      empty: '还没有收藏。点击卡片上的星标，把常用入口放到这里。', browse: '去挑选资源', organize: '调整顺序', done: '完成', add: '收藏 {title}', remove: '取消收藏 {title}', saved: '已加入我的常用', removed: '已取消收藏', earlier: '将 {title} 前移', later: '将 {title} 后移', moved: '已调整收藏顺序',
      view: '资源显示方式', cards: '大卡片', list: '紧凑列表', copy: '复制链接', copyFor: '复制 {title} 的链接', copied: '链接已复制', copyManual: '请手动复制链接', copyHint: '自动复制不可用，请长按或选中下方链接复制。', close: '关闭',
      search: '快捷搜索', placeholder: '搜名称、用途或别名，如 MC、原神', searchHint: '↑ ↓ 选择 · Enter 打开 · Esc 关闭', history: '最近搜索', clear: '清空记录', common: '常用入口', suggested: '推荐入口', noResults: '没有找到匹配的入口，试试其他名称或别名。', results: '{n} 个结果',
      development: '开发', learning: '学习', tools: '工具', games: '游戏', hub: '站内专区', selection: '站内选择', official: '官方入口', thirdparty: '第三方', project: '社区项目',
      web: '网页', desktop: '电脑', windows: 'Windows', macos: 'macOS', linux: 'Linux', android: 'Android', ios: 'iOS', java: 'Java 版',
      pinned: '置顶公告', updates: '更新日志', latest: '最新', added: '新增', improved: '优化', fixed: '修复', updatesCount: '{n} 条更新', returnLibrary: '返回资源库'
    },
    'zh-TW': {
      favorites: '我的常用', favoritesHint: '收藏常用入口，下次直接找到。', local: '儲存在目前瀏覽器，不跨裝置同步。', temporary: '瀏覽器未允許儲存，目前頁面仍可使用。',
      empty: '還沒有收藏。點擊卡片上的星號，把常用入口放到這裡。', browse: '去挑選資源', organize: '調整順序', done: '完成', add: '收藏 {title}', remove: '取消收藏 {title}', saved: '已加入我的常用', removed: '已取消收藏', earlier: '將 {title} 前移', later: '將 {title} 後移', moved: '已調整收藏順序',
      view: '資源顯示方式', cards: '大卡片', list: '精簡列表', copy: '複製連結', copyFor: '複製 {title} 的連結', copied: '連結已複製', copyManual: '請手動複製連結', copyHint: '無法自動複製，請長按或選取下方連結複製。', close: '關閉',
      search: '快捷搜尋', placeholder: '搜尋名稱、用途或別名，如 MC、原神', searchHint: '↑ ↓ 選擇 · Enter 開啟 · Esc 關閉', history: '最近搜尋', clear: '清空紀錄', common: '常用入口', suggested: '推薦入口', noResults: '找不到相符的入口，試試其他名稱或別名。', results: '{n} 個結果',
      development: '開發', learning: '學習', tools: '工具', games: '遊戲', hub: '站內專區', selection: '站內選擇', official: '官方入口', thirdparty: '第三方', project: '社群專案',
      web: '網頁', desktop: '電腦', windows: 'Windows', macos: 'macOS', linux: 'Linux', android: 'Android', ios: 'iOS', java: 'Java 版',
      pinned: '置頂公告', updates: '更新日誌', latest: '最新', added: '新增', improved: '優化', fixed: '修復', updatesCount: '{n} 則更新', returnLibrary: '返回資源庫'
    },
    en: {
      favorites: 'Your shortcuts', favoritesHint: 'Keep your everyday resources close.', local: 'Saved in this browser. Not synced across devices.', temporary: 'Storage is unavailable. Changes last for this page only.',
      empty: 'No favorites yet. Star a resource to keep it here.', browse: 'Explore resources', organize: 'Reorder', done: 'Done', add: 'Favorite {title}', remove: 'Unfavorite {title}', saved: 'Added to your shortcuts', removed: 'Removed from favorites', earlier: 'Move {title} earlier', later: 'Move {title} later', moved: 'Favorites reordered',
      view: 'Resource layout', cards: 'Cards', list: 'Compact list', copy: 'Copy link', copyFor: 'Copy link to {title}', copied: 'Link copied', copyManual: 'Copy this link', copyHint: 'Automatic copying is unavailable. Select or hold the link below to copy it.', close: 'Close',
      search: 'Quick search', placeholder: 'Search names, uses or aliases, e.g. MC', searchHint: '↑ ↓ Select · Enter Open · Esc Close', history: 'Recent searches', clear: 'Clear history', common: 'Your shortcuts', suggested: 'Suggested', noResults: 'No matching destinations. Try another name or alias.', results: '{n} results',
      development: 'Development', learning: 'Learning', tools: 'Tools', games: 'Games', hub: 'Resource hub', selection: 'Choose options', official: 'Official', thirdparty: 'Third-party', project: 'Community project',
      web: 'Web', desktop: 'Desktop', windows: 'Windows', macos: 'macOS', linux: 'Linux', android: 'Android', ios: 'iOS', java: 'Java edition',
      pinned: 'Pinned notices', updates: 'Update log', latest: 'Latest', added: 'New', improved: 'Improved', fixed: 'Fixed', updatesCount: '{n} updates', returnLibrary: 'Back to resources'
    },
    ja: {
      favorites: 'よく使うリソース', favoritesHint: 'お気に入りの入口を、すぐ手の届く場所に。', local: 'このブラウザーに保存されます。端末間の同期はありません。', temporary: '保存できないため、このページ内でのみ利用できます。',
      empty: 'まだ登録がありません。カードの星を押すと、ここに追加されます。', browse: 'リソースを探す', organize: '並べ替え', done: '完了', add: '{title} をお気に入りに追加', remove: '{title} をお気に入りから削除', saved: 'お気に入りに追加しました', removed: 'お気に入りから削除しました', earlier: '{title} を前へ移動', later: '{title} を後ろへ移動', moved: '並び順を変更しました',
      view: 'リソースの表示', cards: 'カード', list: '一覧', copy: 'リンクをコピー', copyFor: '{title} のリンクをコピー', copied: 'リンクをコピーしました', copyManual: 'リンクを手動でコピー', copyHint: '自動コピーが使えません。下のリンクを選択するか長押ししてコピーしてください。', close: '閉じる',
      search: 'クイック検索', placeholder: '名前・用途・別名で検索（MC、原神など）', searchHint: '↑ ↓ 選択 · Enter 開く · Esc 閉じる', history: '最近の検索', clear: '履歴を消去', common: 'よく使うリソース', suggested: 'おすすめ', noResults: '見つかりませんでした。別の名前や略称で検索してください。', results: '{n} 件',
      development: '開発', learning: '学習', tools: 'ツール', games: 'ゲーム', hub: '専用ページ', selection: '選択ページ', official: '公式サイト', thirdparty: '非公式サイト', project: 'コミュニティ',
      web: 'Web', desktop: 'PC', windows: 'Windows', macos: 'macOS', linux: 'Linux', android: 'Android', ios: 'iOS', java: 'Java 版',
      pinned: '固定のお知らせ', updates: '更新履歴', latest: '最新', added: '追加', improved: '改善', fixed: '修正', updatesCount: '{n} 件の更新', returnLibrary: 'リソースに戻る'
    }
  };
  const $ = selector => document.querySelector(selector);
  const lang = () => words[document.documentElement.lang] ? document.documentElement.lang : 'zh-CN';
  const text = (key, values = {}) => Object.entries(values).reduce((value, [name, replacement]) => value.replaceAll('{' + name + '}', replacement), words[lang()][key] || key);
  const localized = item => item.content[lang()] || item.content['zh-CN'];
  const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  const icon = name => '<svg viewBox="0 0 24 24" aria-hidden="true">' + ({ star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L2 9.6l6.2-.9Z"/>', copy: '<rect x="8" y="8" width="12" height="12" rx="3"/><path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/>', close: '<path d="m6 6 12 12M18 6 6 18"/>', up: '<path d="m6 14 6-6 6 6"/>', down: '<path d="m6 10 6 6 6-6"/>', search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>' }[name] || '') + '</svg>';
  const read = (key, fallback) => { try { const raw = localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw); } catch { return fallback; } };
  let storageOK = true;
  const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); storageOK = true; return true; } catch { storageOK = false; return false; } };
  const sanitizeFavorites = value => Array.isArray(value) ? [...new Set(value.filter(id => typeof id === 'string' && byId.has(id)))].slice(0, catalog.length) : [];
  const sanitizeHistory = value => Array.isArray(value) ? [...new Set(value.filter(q => typeof q === 'string').map(q => q.trim().slice(0, 120)).filter(Boolean))].slice(0, 6) : [];
  let favorites = sanitizeFavorites(read('jy-favorites', []));
  let recent = sanitizeHistory(read('jy-search-history', []));
  let view = read('jy-library-view', 'cards') === 'list' ? 'list' : 'cards';
  let organizing = false, initialized = false, home, toastTimer, opener, priorOverflow = '', searchIndex = -1;
  const normalize = value => String(value).normalize('NFKC').toLocaleLowerCase().replace(/[\p{P}\p{S}]+/gu, ' ').replace(/\s+/g, ' ').trim();
  function matches(item, query) {
    const parts = normalize(query).split(' ').filter(Boolean);
    const parent = byId.get(item.parent);
    const haystack = normalize([Object.values(item.content).flat().join(' '), item.domain, item.aliases.join(' '), parent?.aliases.join(' ') || '', item.platforms.map(text).join(' '), text(item.category)].join(' '));
    return parts.every(part => /^[a-z0-9]{1,2}$/.test(part) ? haystack.split(' ').some(word => word.startsWith(part)) : haystack.includes(part));
  }
  function tags(item) {
    return '<div class="resource-metadata"><span class="source-badge" data-source="' + item.source + '">' + escape(text(item.source)) + '</span><span class="platform-badge">' + escape(item.platforms.map(text).join(' · ')) + '</span></div>';
  }
  function notify(message) {
    const toast = $('#library-toast');
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
  }
  function actionButton(item, action) {
    const active = favorites.includes(item.id), title = localized(item)[0];
    const label = text(action === 'favorite' ? (active ? 'remove' : 'add') : 'copyFor', { title });
    return '<button type="button" class="library-icon" data-entry-id="' + item.id + '" data-library-action="' + action + '" aria-label="' + escape(label) + '" title="' + escape(label) + '"' + (action === 'favorite' ? ' aria-pressed="' + active + '"' : '') + '>' + icon(action === 'favorite' ? 'star' : 'copy') + '</button>';
  }
  function decorateCards() {
    document.querySelectorAll('a.resource-card, a.hub-card, a.featured-card').forEach(card => {
      const item = byURL.get(card.href);
      if (!item) return;
      let entry = card.parentElement;
      if (!entry.classList.contains('library-entry')) {
        entry = document.createElement('div');
        entry.className = 'library-entry' + (card.classList.contains('featured-card') ? ' featured-entry' : '');
        entry.dataset.entryId = item.id;
        card.before(entry);
        entry.append(card);
        const actions = document.createElement('div');
        actions.className = 'entry-actions';
        actions.innerHTML = actionButton(item, 'favorite') + actionButton(item, 'copy');
        entry.append(actions);
      }
      const body = card.querySelector('.resource-body, .hub-body');
      if (body && !body.querySelector('.resource-metadata')) body.querySelector('p').insertAdjacentHTML('afterend', tags(item));
    });
    document.querySelectorAll('.download-card').forEach(card => {
      const links = [...card.querySelectorAll('a.download-button')];
      if (!links.length || card.querySelector('.download-utilities')) return;
      const utilities = document.createElement('div');
      utilities.className = 'download-utilities';
      links.forEach(link => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'library-copy-download';
        button.dataset.copyUrl = link.href;
        button.dataset.copyTitle = link.textContent.trim();
        button.innerHTML = icon('copy') + '<span>' + escape(text('copyFor', { title: link.textContent.trim() })) + '</span>';
        utilities.append(button);
      });
      (card.querySelector('.download-content') || card).append(utilities);
    });
    syncActions();
    applyView();
  }
  function syncActions() {
    document.querySelectorAll('[data-library-action]').forEach(button => {
      const item = byId.get(button.dataset.entryId);
      if (!item) return;
      const active = favorites.includes(item.id);
      const label = text(button.dataset.libraryAction === 'favorite' ? (active ? 'remove' : 'add') : 'copyFor', { title: localized(item)[0] });
      button.setAttribute('aria-label', label);
      button.title = label;
      if (button.dataset.libraryAction === 'favorite') button.setAttribute('aria-pressed', String(active));
    });
  }
  function toggleFavorite(id) {
    favorites = sanitizeFavorites(read('jy-favorites', favorites));
    const wasSaved = favorites.includes(id);
    favorites = wasSaved ? favorites.filter(value => value !== id) : [...favorites, id];
    write('jy-favorites', favorites);
    renderFavorites();
    syncActions();
    notify(text(wasSaved ? 'removed' : 'saved') + (storageOK ? '' : ' · ' + text('temporary')));
  }
  function renderFavorites() {
    const section = $('#favorites-section');
    if (!section) return;
    section.querySelector('h2').textContent = text('favorites');
    section.querySelector('.favorites-intro').textContent = text('favoritesHint');
    section.querySelector('.favorites-storage').textContent = text(storageOK ? 'local' : 'temporary');
    const organize = $('#organize-favorites');
    organize.textContent = text(organizing ? 'done' : 'organize');
    organize.setAttribute('aria-pressed', String(organizing));
    organize.disabled = favorites.length < 2;
    $('#favorites-grid').innerHTML = favorites.length ? favorites.map((id, index) => {
      const item = byId.get(id), title = localized(item)[0];
      return '<div class="favorite-entry" data-favorite-id="' + id + '"><a class="favorite-link" href="' + escape(item.url) + '"' + (item.internal ? '' : ' target="_blank" rel="noopener noreferrer"') + '><span class="shortcut-glyph" aria-hidden="true">' + escape(item.glyph) + '</span><span><strong>' + escape(title) + '</strong><small>' + escape(text(item.source)) + ' <span aria-hidden="true">' + (item.internal ? '→' : '↗') + '</span></small></span></a><div class="favorite-actions">' + (organizing ? '<button type="button" class="library-icon" data-move="-1" data-entry-id="' + id + '" aria-label="' + escape(text('earlier', { title })) + '"' + (index === 0 ? ' disabled' : '') + '>' + icon('up') + '</button><button type="button" class="library-icon" data-move="1" data-entry-id="' + id + '" aria-label="' + escape(text('later', { title })) + '"' + (index === favorites.length - 1 ? ' disabled' : '') + '>' + icon('down') + '</button>' : '') + actionButton(item, 'favorite') + '</div></div>';
    }).join('') : '<div class="favorites-empty"><span>' + escape(text('empty')) + '</span><a href="#resources">' + escape(text('browse')) + ' <span aria-hidden="true">→</span></a></div>';
  }
  function moveFavorite(id, direction) {
    favorites = sanitizeFavorites(read('jy-favorites', favorites));
    const index = favorites.indexOf(id), next = index + direction;
    if (index < 0 || next < 0 || next >= favorites.length) return;
    [favorites[index], favorites[next]] = [favorites[next], favorites[index]];
    write('jy-favorites', favorites);
    renderFavorites();
    const entry = document.querySelector('[data-favorite-id="' + id + '"]');
    const button = entry?.querySelector('[data-move="' + direction + '"]:not(:disabled)') || entry?.querySelector('[data-library-action="favorite"]');
    button?.focus({ preventScroll: true });
    notify(text('moved'));
  }
  function applyView() {
    const grid = $('#resource-grid');
    if (!grid) return;
    grid.dataset.view = view;
    document.querySelectorAll('[data-library-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.libraryView === view)));
  }
  async function copyLink(url) {
    try {
      await navigator.clipboard.writeText(new URL(url, location.href).href);
      notify(text('copied'));
    } catch {
      const dialog = $('#copy-link-dialog');
      dialog.querySelector('h2').textContent = text('copyManual');
      dialog.querySelector('p').textContent = text('copyHint');
      dialog.querySelector('button').setAttribute('aria-label', text('close'));
      dialog.querySelector('input').setAttribute('aria-label', text('copy'));
      dialog.querySelector('input').value = new URL(url, location.href).href;
      dialog.showModal();
      dialog.querySelector('input').focus();
      dialog.querySelector('input').select();
    }
  }
  function searchResults(query) {
    const normalized = normalize(query);
    const score = item => normalize(localized(item)[0]) === normalized ? 0 : normalize(localized(item)[0]).startsWith(normalized) ? 1 : item.home ? 2 : 3;
    return catalog.filter(item => matches(item, query)).sort((a, b) => score(a) - score(b));
  }
  function renderSearch() {
    const input = $('#quick-search-input');
    if (!input) return;
    const query = input.value.trim();
    const items = query ? searchResults(query) : favorites.length ? favorites.map(id => byId.get(id)) : catalog.filter(item => item.home).slice(0, 6);
    $('#search-history').innerHTML = !query && recent.length ? '<div class="quick-group-head"><h3>' + escape(text('history')) + '</h3><button type="button" id="clear-search-history">' + escape(text('clear')) + '</button></div><div class="history-chips">' + recent.map((value, index) => '<button type="button" data-history-index="' + index + '">' + escape(value) + '</button>').join('') + '</div>' : '';
    const groups = query ? ['games', 'tools', 'development', 'learning'].map(group => [text(group), items.filter(item => item.category === group)]) : [[text(favorites.length ? 'common' : 'suggested'), items]];
    let resultIndex = 0;
    $('#quick-results').innerHTML = groups.filter(([, entries]) => entries.length).map(([label, entries], groupIndex) => '<div role="group" aria-labelledby="quick-group-' + groupIndex + '"><h3 id="quick-group-' + groupIndex + '" class="quick-group-label">' + escape(label) + '</h3>' + entries.map(item => {
      const [title] = localized(item), index = resultIndex++;
      return '<a role="option" aria-selected="false" tabindex="-1" id="quick-option-' + index + '" class="quick-result" data-result-id="' + item.id + '" href="' + escape(item.url) + '"' + (item.internal ? '' : ' target="_blank" rel="noopener noreferrer"') + '><span class="shortcut-glyph" aria-hidden="true">' + escape(item.glyph) + '</span><span class="quick-result-copy"><strong>' + escape(title) + '</strong><small>' + escape(text(item.source) + ' · ' + item.platforms.map(text).join(' / ')) + '</small><small class="quick-domain">' + escape(item.domain) + '</small></span><span class="quick-arrow" aria-hidden="true">' + (item.internal ? '→' : '↗') + '</span></a>';
    }).join('') + '</div>').join('');
    $('#quick-empty').hidden = items.length > 0;
    $('#quick-empty').textContent = text('noResults');
    $('#quick-count').textContent = text('results', { n: items.length });
    searchIndex = -1;
    input.removeAttribute('aria-activedescendant');
  }
  function selectResult(index) {
    const options = [...document.querySelectorAll('#quick-results [role="option"]')];
    if (!options.length) return;
    searchIndex = (index + options.length) % options.length;
    options.forEach((option, i) => option.setAttribute('aria-selected', String(i === searchIndex)));
    $('#quick-search-input').setAttribute('aria-activedescendant', options[searchIndex].id);
    options[searchIndex].scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }
  function rememberSearch() {
    const query = $('#quick-search-input').value.trim().slice(0, 120);
    if (!query) return;
    recent = sanitizeHistory([query, ...sanitizeHistory(read('jy-search-history', recent)).filter(value => normalize(value) !== normalize(query))]);
    write('jy-search-history', recent);
  }
  function openSearch() {
    const dialog = $('#quick-search');
    if (!dialog || dialog.open || document.querySelector('dialog[open]')) return;
    opener = document.activeElement;
    priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    refreshSearchLabels();
    renderSearch();
    dialog.showModal();
    $('#quick-search-input').focus({ preventScroll: true });
  }
  function refreshSearchLabels() {
    $('#quick-search-title').textContent = text('search');
    $('#quick-search-input').placeholder = text('placeholder');
    $('#quick-search-input').setAttribute('aria-label', text('search'));
    $('#close-quick-search').setAttribute('aria-label', text('close'));
    $('#quick-search-hint').textContent = text('searchHint');
    $('#quick-results').setAttribute('aria-label', text('search'));
  }
  function refresh() {
    if (!initialized) return;
    renderFavorites();
    document.querySelectorAll('[data-library-text]').forEach(element => { element.textContent = text(element.dataset.libraryText); });
    document.querySelectorAll('.resource-metadata').forEach(element => {
      const card = element.closest('a');
      const item = card && byURL.get(card.href);
      if (item) element.outerHTML = tags(item);
    });
    document.querySelectorAll('.download-utilities').forEach(element => element.remove());
    decorateCards();
    refreshSearchLabels();
    if ($('#quick-search').open) renderSearch();
  }
  function saveHomeState() {
    if (!home) return;
    const entry = [...document.querySelectorAll('#resource-grid .library-entry')].find(element => element.getBoundingClientRect().bottom > 85);
    const state = { ...home.getState(), scroll: scrollY, anchor: entry?.dataset.entryId, offset: entry?.getBoundingClientRect().top, at: Date.now() };
    try { sessionStorage.setItem('jy-library-return', JSON.stringify(state)); } catch {}
  }
  function restoreHomeState() {
    if (!home) return;
    let state;
    try { state = JSON.parse(sessionStorage.getItem('jy-library-return')); } catch {}
    const navigation = performance.getEntriesByType('navigation')[0];
    let fromHub = false;
    try { fromHub = new URL(document.referrer).origin === location.origin && !/\/(index\.html)?$/.test(new URL(document.referrer).pathname); } catch {}
    if (!state || !(navigation?.type === 'back_forward' || fromHub && location.hash === '#resources') || Date.now() - state.at > 86400000) return;
    home.restoreState(state);
    requestAnimationFrame(() => {
      const entry = [...document.querySelectorAll('#resource-grid .library-entry')].find(element => element.dataset.entryId === state.anchor);
      window.scrollTo({ top: Math.max(0, entry && Number.isFinite(state.offset) ? scrollY + entry.getBoundingClientRect().top - state.offset : Number(state.scroll) || 0), behavior: 'instant' });
    });
  }
  function initHome(callbacks) {
    home = callbacks;
  }
  function init() {
    const toast = document.createElement('div');
    toast.id = 'library-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
    const searchDialog = document.createElement('dialog');
    searchDialog.id = 'quick-search';
    searchDialog.className = 'library-dialog';
    searchDialog.setAttribute('aria-labelledby', 'quick-search-title');
    searchDialog.innerHTML = '<div class="quick-shell"><div class="quick-header"><h2 id="quick-search-title"></h2><button type="button" class="library-icon" id="close-quick-search">' + icon('close') + '</button></div><div class="quick-input-wrap">' + icon('search') + '<input id="quick-search-input" type="search" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="quick-results" aria-describedby="quick-search-hint" maxlength="120" autocomplete="off" spellcheck="false"></div><div class="quick-scroll"><div id="search-history"></div><div id="quick-results" role="listbox"></div><p id="quick-empty" hidden></p></div><div class="quick-footer"><span id="quick-search-hint"></span><span id="quick-count" role="status"></span></div></div>';
    document.body.append(searchDialog);
    const copyDialog = document.createElement('dialog');
    copyDialog.id = 'copy-link-dialog';
    copyDialog.className = 'library-dialog';
    copyDialog.setAttribute('aria-labelledby', 'copy-link-title');
    copyDialog.innerHTML = '<div class="quick-header"><h2 id="copy-link-title"></h2><button type="button" class="library-icon">' + icon('close') + '</button></div><p></p><input readonly type="text">';
    document.body.append(copyDialog);
    copyDialog.querySelector('button').onclick = () => copyDialog.close();
    if ($('#resource-grid')) {
      const section = document.createElement('section');
      section.id = 'favorites-section';
      section.className = 'section favorites-section';
      section.setAttribute('aria-labelledby', 'favorites-title');
      section.innerHTML = '<div class="section-head"><div><h2 id="favorites-title"></h2><p class="favorites-intro"></p></div><button type="button" id="organize-favorites" class="library-text-button" aria-pressed="false"></button></div><div id="favorites-grid" class="favorites-grid"></div><p class="favorites-storage"></p>';
      $('main').prepend(section);
      const controls = document.createElement('div');
      controls.className = 'library-view-controls';
      controls.innerHTML = '<span data-library-text="view"></span><div role="group" aria-labelledby="library-view-label"><button type="button" data-library-view="cards" data-library-text="cards"></button><button type="button" data-library-view="list" data-library-text="list"></button></div>';
      controls.firstElementChild.id = 'library-view-label';
      $('#resource-grid').before(controls);
      $('#organize-favorites').onclick = () => { organizing = !organizing; renderFavorites(); };
      restoreHomeState();
    }
    $('#close-quick-search').onclick = () => searchDialog.close();
    searchDialog.addEventListener('close', () => {
      document.body.style.overflow = priorOverflow;
      opener?.focus?.({ preventScroll: true });
    });
    [searchDialog, copyDialog].forEach(dialog => dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    }));
    $('#quick-search-input').addEventListener('input', renderSearch);
    $('#quick-search-input').addEventListener('keydown', event => {
      if (event.isComposing || event.keyCode === 229) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); selectResult(searchIndex === -1 && event.key === 'ArrowUp' ? -1 : searchIndex + (event.key === 'ArrowDown' ? 1 : -1)); }
      if (event.key === 'Enter') { event.preventDefault(); document.getElementById('quick-option-' + Math.max(0, searchIndex))?.click(); }
    });
    document.addEventListener('keydown', event => {
      if (event.isComposing || event.repeat) return;
      const typing = event.target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"])');
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k' || event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
        if (document.querySelector('dialog[open]')) return;
        event.preventDefault(); openSearch();
      }
    });
    document.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (button?.dataset.libraryAction) {
        const id = button.dataset.entryId;
        if (button.dataset.libraryAction === 'favorite') {
          const inFavorites = button.closest('#favorites-grid');
          toggleFavorite(id);
          if (inFavorites) ($('#favorites-grid [data-library-action="favorite"]') || $('#organize-favorites:not(:disabled)') || $('#favorites-grid a'))?.focus({ preventScroll: true });
        } else copyLink(byId.get(id).url);
      } else if (button?.dataset.move) moveFavorite(button.dataset.entryId, Number(button.dataset.move));
      else if (button?.dataset.libraryView) { view = button.dataset.libraryView; write('jy-library-view', view); applyView(); }
      else if (button?.dataset.copyUrl) copyLink(button.dataset.copyUrl);
      else if (button?.dataset.historyIndex !== undefined) { $('#quick-search-input').value = recent[Number(button.dataset.historyIndex)] || ''; renderSearch(); $('#quick-search-input').focus(); }
      else if (button?.id === 'clear-search-history') { recent = []; write('jy-search-history', recent); renderSearch(); $('#quick-search-input').focus(); }
      const result = event.target.closest('[data-result-id]');
      if (result) { rememberSearch(); saveHomeState(); searchDialog.close(); }
      if (event.target.closest('a[href]')) saveHomeState();
    });
    window.addEventListener('pagehide', saveHomeState);
    window.addEventListener('pageshow', event => {
      if (!event.persisted) return;
      favorites = sanitizeFavorites(read('jy-favorites', favorites));
      recent = sanitizeHistory(read('jy-search-history', recent));
      view = read('jy-library-view', view) === 'list' ? 'list' : 'cards';
      refresh();
    });
    window.addEventListener('storage', event => {
      if (event.key !== null && !['jy-favorites', 'jy-library-view', 'jy-search-history'].includes(event.key)) return;
      favorites = sanitizeFavorites(read('jy-favorites', []));
      recent = sanitizeHistory(read('jy-search-history', []));
      view = read('jy-library-view', 'cards') === 'list' ? 'list' : 'cards';
      refresh();
    });
    new MutationObserver(refresh).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    new MutationObserver(records => {
      if (records.some(record => [...record.addedNodes].some(node => node.nodeType === 1 && (node.matches('a.resource-card,a.hub-card,a.featured-card,a.download-button') || node.querySelector('a.resource-card,a.hub-card,a.featured-card,a.download-button'))))) decorateCards();
    }).observe($('main'), { childList: true, subtree: true });
    document.addEventListener('jy:resources-rendered', decorateCards);
    initialized = true;
    refresh();
  }
  window.JYLibrary = { text, matches, tags, openSearch, initHome, refresh };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
