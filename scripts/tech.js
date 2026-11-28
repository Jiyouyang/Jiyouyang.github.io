/* JY//OS interaction layer.
   - Command palette (Ctrl/Cmd+K or "/"): resources + commands, one input
   - Keyboard navigation: j/k cards, f favourite, t theme, 1-9 platform, g h home, ? help
   - Download pages: platform auto-detected, remembered, deep-linkable (#android)
   - Reading progress bar, cursor spotlight, home HUD readout
   Content and settings logic stay in each page's own script; this layer only
   drives their existing controls, so nothing is duplicated. */
(() => {
  'use strict';
  const root = document.documentElement;
  function mount() {
    const controller = new AbortController();
    const { signal } = controller;
    const onExit = fn => signal.addEventListener('abort', fn, {once: true});
    function listen(target, event, fn, options) {
      target?.addEventListener(event, fn, typeof options === 'boolean' ? {capture: options, signal} : {...options, signal});
    }
    function observe(Type, ...args) {
      const observer = new Type(...args);
      onExit(() => observer.disconnect());
      return observer;
    }
    const later = (fn, ms) => setTimeout(() => { if (!signal.aborted) fn(); }, ms);
    const nextFrame = fn => requestAnimationFrame(() => { if (!signal.aborted) fn(); });
    const previousSearch = window.JYLibrary?.openSearch;
    const transition = document.createElement('style');
    transition.textContent = '@media (prefers-reduced-motion: no-preference) { @view-transition { navigation: auto; } }';
    document.head.append(transition);
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
    const OFFLINE = typeof window.__JYBASE === 'string'; // single-file preview bundle
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const isMac = /Mac|iPhone|iPad/i.test(navigator.userAgentData?.platform || navigator.platform || '');
    const MOD = isMac ? '⌘' : 'Ctrl';
    const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    const norm = value => String(value).normalize('NFKC').toLocaleLowerCase().replace(/[\p{P}\p{S}]+/gu, ' ').replace(/\s+/g, ' ').trim();
    const read = (key, fallback) => { try { const raw = localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw); } catch { return fallback; } };
    function storedIds(key) {
      const value = read(key, []);
      return Array.isArray(value) ? value : [];
    }
    const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };

    /* ------------------------------------------------------------ copy */
    const WORDS = {
      'zh-CN': {
        placeholder: '搜索资源，或输入 > 查看指令', label: '命令面板', gFav: '我的常用', gSug: '推荐入口', gRes: '资源', gCmd: '指令',
        empty: '没有匹配的结果', hSel: '选择', hOpen: '打开', hClose: '关闭', hCmd: '仅指令', count: '{n} 项',
        themeLight: '切换到浅色模式', themeDark: '切换到深色模式', themeAuto: '外观跟随系统', accent: '主题色', language: '语言', layout: '资源布局',
        goHome: '回到首页', copyPage: '复制当前页面链接', random: '随机逛逛一个资源', help: '查看键盘快捷键',
        copied: '页面链接已复制', copyFail: '复制失败，请手动复制地址栏中的链接', themeNow: '外观：{m}', light: '浅色', dark: '深色', auto: '跟随系统',
        rec: '推荐：与当前设备匹配', helpTitle: '键盘快捷键',
        kOpen: '打开命令面板', kMove: '上一个 / 下一个卡片', kFav: '收藏 / 取消收藏当前卡片', kTheme: '切换深浅模式', kTab: '切换下载平台', kHome: '回到首页', kHelp: '显示本帮助'
      },
      'zh-TW': {
        placeholder: '搜尋資源，或輸入 > 查看指令', label: '命令面板', gFav: '我的常用', gSug: '推薦入口', gRes: '資源', gCmd: '指令',
        empty: '沒有符合的結果', hSel: '選擇', hOpen: '開啟', hClose: '關閉', hCmd: '僅指令', count: '{n} 項',
        themeLight: '切換到淺色模式', themeDark: '切換到深色模式', themeAuto: '外觀跟隨系統', accent: '主題色', language: '語言', layout: '資源版面',
        goHome: '回到首頁', copyPage: '複製目前頁面連結', random: '隨機逛逛一個資源', help: '查看鍵盤快速鍵',
        copied: '頁面連結已複製', copyFail: '複製失敗，請手動複製網址列中的連結', themeNow: '外觀：{m}', light: '淺色', dark: '深色', auto: '跟隨系統',
        rec: '推薦：與目前裝置相符', helpTitle: '鍵盤快速鍵',
        kOpen: '開啟命令面板', kMove: '上一個 / 下一個卡片', kFav: '收藏 / 取消收藏目前卡片', kTheme: '切換深淺模式', kTab: '切換下載平台', kHome: '回到首頁', kHelp: '顯示本說明'
      },
      en: {
        placeholder: 'Search resources, or type > for commands', label: 'Command palette', gFav: 'Your shortcuts', gSug: 'Suggested', gRes: 'Resources', gCmd: 'Commands',
        empty: 'No matches', hSel: 'Select', hOpen: 'Open', hClose: 'Close', hCmd: 'Commands only', count: '{n} items',
        themeLight: 'Switch to light mode', themeDark: 'Switch to dark mode', themeAuto: 'Follow system appearance', accent: 'Accent', language: 'Language', layout: 'Layout',
        goHome: 'Go to home', copyPage: 'Copy link to this page', random: 'Surprise me with a resource', help: 'Show keyboard shortcuts',
        copied: 'Page link copied', copyFail: 'Could not copy. Copy the address bar link instead.', themeNow: 'Appearance: {m}', light: 'Light', dark: 'Dark', auto: 'System',
        rec: 'Recommended for this device', helpTitle: 'Keyboard shortcuts',
        kOpen: 'Open the command palette', kMove: 'Previous / next card', kFav: 'Favorite the focused card', kTheme: 'Cycle light / dark', kTab: 'Switch download platform', kHome: 'Go to home', kHelp: 'Show this help'
      },
      ja: {
        placeholder: 'リソースを検索、または > でコマンド', label: 'コマンドパレット', gFav: 'よく使う', gSug: 'おすすめ', gRes: 'リソース', gCmd: 'コマンド',
        empty: '一致する結果がありません', hSel: '選択', hOpen: '開く', hClose: '閉じる', hCmd: 'コマンドのみ', count: '{n} 件',
        themeLight: 'ライトモードに切り替え', themeDark: 'ダークモードに切り替え', themeAuto: '外観をシステムに合わせる', accent: 'テーマカラー', language: '言語', layout: '表示形式',
        goHome: 'ホームへ戻る', copyPage: 'このページのリンクをコピー', random: 'ランダムに 1 件開く', help: 'キーボードショートカット',
        copied: 'ページのリンクをコピーしました', copyFail: 'コピーできませんでした。アドレスバーのリンクをコピーしてください', themeNow: '外観：{m}', light: 'ライト', dark: 'ダーク', auto: 'システム',
        rec: 'お使いの端末におすすめ', helpTitle: 'キーボードショートカット',
        kOpen: 'コマンドパレットを開く', kMove: '前 / 次のカード', kFav: '選択中のカードをお気に入り', kTheme: 'ライト / ダークを切り替え', kTab: 'ダウンロード先を切り替え', kHome: 'ホームへ戻る', kHelp: 'このヘルプを表示'
      }
    };
    Object.assign(WORDS['zh-CN'], { favOn: '已加入我的常用', favOff: '已移出我的常用', clear: '清除筛选', recent: '最近访问', kArrows: '方向键在卡片间移动', kBack: '返回上一级' });
    Object.assign(WORDS['zh-TW'], { favOn: '已加入我的常用', favOff: '已移出我的常用', clear: '清除篩選', recent: '最近造訪', kArrows: '方向鍵在卡片間移動', kBack: '返回上一層' });
    Object.assign(WORDS.en, { favOn: 'Added to your shortcuts', favOff: 'Removed from your shortcuts', clear: 'Clear filters', recent: 'Recently opened', kArrows: 'Move between cards', kBack: 'Go back one level' });
    Object.assign(WORDS.ja, { favOn: 'よく使うに追加しました', favOff: 'よく使うから外しました', clear: '絞り込みを解除', recent: '最近開いた', kArrows: 'カード間を移動', kBack: '一つ前のページへ' });
    Object.assign(WORDS['zh-CN'], { dHome: '首页', dSearch: '搜索', dFav: '常用', dSet: '设置', dNav: '快捷导航' });
    Object.assign(WORDS['zh-TW'], { dHome: '首頁', dSearch: '搜尋', dFav: '常用', dSet: '設定', dNav: '快速導覽' });
    Object.assign(WORDS.en, { dHome: 'Home', dSearch: 'Search', dFav: 'Saved', dSet: 'Settings', dNav: 'Quick navigation' });
    Object.assign(WORDS.ja, { dHome: 'ホーム', dSearch: '検索', dFav: 'よく使う', dSet: '設定', dNav: 'クイックナビ' });
    Object.assign(WORDS['zh-CN'], { sSearch: '搜索', sFind: '搜索资源名称或用途', sAll: '全部', sFavTitle: '我的常用', sFavEmpty: '还没有常用资源。在“搜索”里点星标，就会出现在这里。', sGoSearch: '去搜索', sSetTitle: '设置', sAppear: '外观', sAccent: '主题色', sLang: '语言', sLayout: '资源布局', sNoHit: '没有找到相关资源', sStar: '收藏', sUnstar: '取消收藏' });
    Object.assign(WORDS['zh-TW'], { sSearch: '搜尋', sFind: '搜尋資源名稱或用途', sAll: '全部', sFavTitle: '我的常用', sFavEmpty: '還沒有常用資源。在「搜尋」裡點星號，就會出現在這裡。', sGoSearch: '去搜尋', sSetTitle: '設定', sAppear: '外觀', sAccent: '主題色', sLang: '語言', sLayout: '資源版面', sNoHit: '沒有找到相關資源', sStar: '收藏', sUnstar: '取消收藏' });
    Object.assign(WORDS.en, { sSearch: 'Search', sFind: 'Search resources', sAll: 'All', sFavTitle: 'Your shortcuts', sFavEmpty: 'Nothing saved yet. Star a resource in Search and it shows up here.', sGoSearch: 'Go to Search', sSetTitle: 'Settings', sAppear: 'Appearance', sAccent: 'Accent', sLang: 'Language', sLayout: 'Layout', sNoHit: 'No matching resources', sStar: 'Save', sUnstar: 'Remove' });
    Object.assign(WORDS.ja, { sSearch: '検索', sFind: 'リソースを検索', sAll: 'すべて', sFavTitle: 'よく使う', sFavEmpty: 'まだありません。検索で星を付けるとここに表示されます。', sGoSearch: '検索へ', sSetTitle: '設定', sAppear: '外観', sAccent: 'テーマカラー', sLang: '言語', sLayout: '表示形式', sNoHit: '一致するリソースがありません', sStar: '保存', sUnstar: '解除' });
    const lang = () => WORDS[root.lang] ? root.lang : 'zh-CN';
    const t = (key, values = {}) => Object.entries(values).reduce((s, [k, v]) => s.replaceAll('{' + k + '}', v), (WORDS[lang()][key] ?? WORDS['zh-CN'][key] ?? key));

    /* ------------------------------------------------------------ small helpers */
    let toastTimer = 0;
    function toast(message) {
      let el = $('#jy-toast');
      if (!el) { el = document.createElement('div'); el.id = 'jy-toast'; el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite'); document.body.append(el); }
      el.textContent = message;
      el.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = later(() => el.classList.remove('show'), 1900);
    }
    /* Navigate through a real anchor so the offline bundle's link bridge and the
       home page's scroll-restore both keep working. */
    function visit(url, external) {
      const a = document.createElement('a');
      a.href = url;
      if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      a.style.display = 'none';
      document.body.append(a);
      a.click();
      a.remove();
    }
    const themePref = () => $('[data-mode][aria-pressed="true"]')?.dataset.mode || 'auto';
    function setTheme(mode) { $(`[data-mode="${mode}"]`)?.click(); }
    const typingTarget = target => !!target?.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"])');
    const anyDialogOpen = () => !!$('dialog[open]');

    /* ------------------------------------------------------------ catalog */
    const catalog = Array.isArray(window.JYCatalog) ? window.JYCatalog : [];
    const byId = new Map(catalog.map(item => [item.id, item]));
    const localized = item => item.content?.[lang()] || item.content?.['zh-CN'] || ['', ''];
    const categoryName = item => window.JYLibrary?.text ? window.JYLibrary.text(item.category) : item.category;

    function fuzzy(hay, q) {
      if (!q) return 0;
      const at = hay.indexOf(q);
      if (at >= 0) return at === 0 ? 0 : 1 + at / 1000;
      if (q.length < 2) return -1;
      let i = 0, gaps = 0, last = -1;
      for (const ch of hay) { if (ch === q[i]) { if (last >= 0 && hay.indexOf(ch, last + 1) !== last + 1) gaps++; last = hay.indexOf(ch, last + 1); i++; if (i === q.length) break; } }
      return i === q.length ? 10 + gaps : -1;
    }
    function resourceScore(item, query, nq) {
      const [title] = localized(item), nt = norm(title);
      if (window.JYLibrary?.matches?.(item, query)) return nt === nq ? 0 : nt.startsWith(nq) ? 1 : nt.includes(nq) ? 2 : 3;
      const f = fuzzy(nt + ' ' + norm(item.domain || ''), nq);
      return f < 0 ? -1 : 5 + f / 100;
    }

    /* ------------------------------------------------------------ commands */
    function commands() {
      const list = [];
      const pref = themePref();
      if (pref !== 'light') list.push({ label: t('themeLight'), keys: 'light theme appearance 浅色 淺色 ライト', glyph: '◐', run: () => setTheme('light') });
      if (pref !== 'dark') list.push({ label: t('themeDark'), keys: 'dark theme appearance 深色 ダーク', glyph: '◑', run: () => setTheme('dark') });
      if (pref !== 'auto') list.push({ label: t('themeAuto'), keys: 'system auto theme appearance 跟随系统 システム', glyph: '◒', run: () => setTheme('auto') });
      $$('[data-accent-choice]').forEach(button => {
        const name = button.textContent.trim();
        list.push({ label: t('accent') + ' · ' + name, keys: 'accent color theme ' + button.dataset.accentChoice, glyph: '◆', swatch: getComputedStyle(button.querySelector('.swatch-dot') || button).getPropertyValue('--swatch'), run: () => button.click() });
      });
      $$('[data-language]').forEach(button => {
        if (button.dataset.language === root.lang) return;
        list.push({ label: t('language') + ' · ' + button.textContent.trim(), keys: 'language translate 翻译 翻訳 ' + button.dataset.language, glyph: '文', run: () => button.click() });
      });
      $$('[data-library-view]').forEach(button => {
        if (button.getAttribute('aria-pressed') === 'true') return;
        list.push({ label: t('layout') + ' · ' + button.textContent.trim(), keys: 'layout view list cards 列表 卡片', glyph: '▦', run: () => button.click() });
      });
      if (!/\/(index\.html)?$/.test(location.pathname) || OFFLINE && !/index/.test(window.__JYBASE)) list.push({ label: t('goHome'), keys: 'home index 首页 首頁 ホーム', glyph: '⌂', hint: 'g h', run: () => visit('/index.html', false) });
      list.push({ label: t('copyPage'), keys: 'copy link url share 分享 复制', glyph: '⎘', run: copyPage });
      if (catalog.length) list.push({ label: t('random'), keys: 'random surprise lucky 随机 ランダム', glyph: '✦', run: () => { const item = catalog[Math.floor(Math.random() * catalog.length)]; visit(item.url, !item.internal); } });
      list.push({ label: t('help'), keys: 'keyboard shortcuts help 快捷键 キー', glyph: '?', hint: '?', run: () => later(openHelp, 30) });
      return list;
    }
    function copyPage() {
      const url = location.href;
      const ok = () => toast(t('copied'));
      const fallback = () => {
        const area = document.createElement('textarea');
        area.value = url; area.style.cssText = 'position:fixed;opacity:0;pointer-events:none'; document.body.append(area); area.select();
        let done = false; try { done = document.execCommand('copy'); } catch {}
        area.remove(); done ? ok() : toast(t('copyFail'));
      };
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(ok, fallback); else fallback();
    }

    /* ------------------------------------------------------------ recent visits */
    const rememberVisit = id => {
      if (!id) return;
      const list = [id, ...storedIds('jy-recent').filter(x => x !== id)].slice(0, 6);
      write('jy-recent', list);
    };
    listen(document, 'click', event => {
      const link = event.target.closest?.('a.resource-card, a.hub-card, a.featured-card, a.favorite-link');
      if (!link) return;
      const favoriteId = link.closest('[data-favorite-id]')?.dataset.favoriteId;
      rememberVisit(favoriteId || catalog.find(item => item.url === link.getAttribute('href'))?.id);
    }, true);

    /* ------------------------------------------------------------ palette */
    let palette, input, listEl, countEl, hintEl, flat = [], sel = 0, opener = null, savedOverflow = '';

    function buildPalette() {
      palette = document.createElement('dialog');
      palette.id = 'jy-palette';
      palette.innerHTML =
        '<div class="jp-shell"><div class="jp-bar"><span class="jp-prompt" aria-hidden="true">&gt;_</span>' +
        '<input id="jy-palette-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="go" role="combobox" aria-expanded="true" aria-controls="jy-palette-list" aria-autocomplete="list">' +
        '<button type="button" class="jp-esc" data-jp-close><kbd>esc</kbd></button></div>' +
        '<div id="jy-palette-list" class="jp-list" role="listbox"></div>' +
        '<div class="jp-foot"><span class="jp-hints"></span><span class="jp-count" aria-live="polite"></span></div></div>';
      document.body.append(palette);
      input = $('#jy-palette-input', palette); listEl = $('#jy-palette-list', palette); countEl = $('.jp-count', palette); hintEl = $('.jp-hints', palette);
      listen(input, 'input', render);
      listen(input, 'keydown', onPaletteKey);
      listen(palette, 'click', event => {
        if (event.target === palette || event.target.closest('[data-jp-close]')) { palette.close(); return; }
        const row = event.target.closest('.jp-item');
        if (!row) return;
        const entry = flat[Number(row.dataset.idx)];
        if (entry?.cmd) { event.preventDefault(); palette.close(); entry.cmd.run(); }
        else { window.JYLibrary?.rememberSearch?.(input.value); rememberVisit(entry?.item?.id); palette.close(); } // anchors navigate on their own
      });
      listen(listEl, 'mousemove', event => {
        const row = event.target.closest('.jp-item');
        if (row && Number(row.dataset.idx) !== sel) setSel(Number(row.dataset.idx), false);
      });
      listen(palette, 'close', () => {
        document.body.style.overflow = savedOverflow;
        opener?.focus?.({ preventScroll: true });
      });
    }

    function groupsFor(raw) {
      const q = raw.trim();
      const cmdOnly = q.startsWith('>');
      const query = (cmdOnly ? q.slice(1) : q).trim();
      const nq = norm(query);
      const groups = [];
      const cmds = commands();
      if (!nq) {
        if (!cmdOnly && catalog.length) {
          const history = window.JYLibrary?.searchHistory?.() || [];
          if (history.length && root.dataset.style !== 'tech') {
            groups.push([window.JYLibrary.text('history'), history.map(term => ({cmd: {
              label: term, glyph: '↺', run: () => later(() => openPalette(term), 0)
            }}))]);
          }
          const recent = storedIds('jy-recent').filter(id => byId.has(id)).slice(0, 4).map(id => byId.get(id));
          if (recent.length) groups.push([t('recent'), recent.map(item => ({ item }))]);
          const seen = new Set(recent.map(item => item.id));
          const favorites = storedIds('jy-favorites').filter(id => byId.has(id) && !seen.has(id)).slice(0, 6).map(id => byId.get(id));
          const items = favorites.length ? favorites : catalog.filter(item => item.home && !seen.has(item.id)).slice(0, 6);
          if (items.length) groups.push([favorites.length ? t('gFav') : t('gSug'), items.map(item => ({ item }))]);
        }
        groups.push([t('gCmd'), cmds.map(cmd => ({ cmd }))]);
      } else {
        if (!cmdOnly) {
          const hits = catalog.map(item => ({ item, s: resourceScore(item, query, nq) })).filter(h => h.s >= 0).sort((a, b) => a.s - b.s).slice(0, 30);
          if (hits.length) groups.push([t('gRes'), hits]);
        }
        const hits = cmds.map(cmd => ({ cmd, s: fuzzy(norm(cmd.label + ' ' + cmd.keys), nq) })).filter(h => h.s >= 0).sort((a, b) => a.s - b.s);
        if (hits.length) groups.push([t('gCmd'), hits]);
      }
      return { groups, nq: query };
    }
    const mark = (text, q) => {
      if (!q) return esc(text);
      const at = text.toLocaleLowerCase().indexOf(q.toLocaleLowerCase());
      return at < 0 ? esc(text) : esc(text.slice(0, at)) + '<mark>' + esc(text.slice(at, at + q.length)) + '</mark>' + esc(text.slice(at + q.length));
    };

    function render() {
      const { groups, nq } = groupsFor(input.value);
      flat = [];
      let html = '';
      groups.forEach(([label, entries], gi) => {
        html += '<div class="jp-group" role="presentation">' + esc(label) + '</div>';
        entries.forEach(entry => {
          const idx = flat.push(entry) - 1;
          if (entry.item) {
            const item = entry.item, [title, desc] = localized(item), external = !item.internal;
            html += '<a class="jp-item" role="option" id="jp-opt-' + idx + '" data-idx="' + idx + '" aria-selected="false" tabindex="-1" href="' + esc(item.url) + '"' + (external ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
              '<span class="jp-ico">' + esc(item.glyph || '·') + '</span><span class="jp-text"><span class="jp-title">' + mark(title, nq) + '</span>' +
              '<span class="jp-sub">' + esc(item.domain || desc || '') + '</span></span>' +
              '<span class="jp-meta">' + esc(categoryName(item)) + ' ' + (external ? '↗' : '→') + '</span></a>';
          } else {
            const cmd = entry.cmd;
            html += '<div class="jp-item jp-cmd-item" role="option" id="jp-opt-' + idx + '" data-idx="' + idx + '" aria-selected="false" tabindex="-1">' +
              '<span class="jp-ico jp-ico-cmd"' + (cmd.swatch ? ' style="color:' + esc(cmd.swatch) + '"' : '') + '>' + esc(cmd.glyph || '›') + '</span>' +
              '<span class="jp-text"><span class="jp-title">' + mark(cmd.label, nq) + '</span></span>' +
              (cmd.hint ? '<span class="jp-meta">' + cmd.hint.split(' ').map(k => '<kbd>' + esc(k) + '</kbd>').join('') + '</span>' : '<span class="jp-meta">↵</span>') + '</div>';
          }
        });
      });
      listEl.innerHTML = html || '<div class="jp-empty">' + esc(t('empty')) + '</div>';
      countEl.textContent = t('count', { n: String(flat.length) });
      setSel(0, true);
    }
    function setSel(index, scroll) {
      if (!flat.length) { input.removeAttribute('aria-activedescendant'); return; }
      sel = (index + flat.length) % flat.length;
      $$('.jp-item', listEl).forEach(row => row.setAttribute('aria-selected', String(Number(row.dataset.idx) === sel)));
      const row = $('#jp-opt-' + sel, listEl);
      input.setAttribute('aria-activedescendant', 'jp-opt-' + sel);
      if (scroll && row) row.scrollIntoView({ block: 'nearest' });
    }
    function onPaletteKey(event) {
      if (event.isComposing || event.keyCode === 229) return;
      const key = event.key;
      if (key === 'ArrowDown' || key === 'Tab' && !event.shiftKey || key === 'n' && event.ctrlKey) { event.preventDefault(); setSel(sel + 1, true); }
      else if (key === 'ArrowUp' || key === 'Tab' && event.shiftKey || key === 'p' && event.ctrlKey) { event.preventDefault(); setSel(sel - 1, true); }
      else if (key === 'Home' && !input.value) { event.preventDefault(); setSel(0, true); }
      else if (key === 'End' && !input.value) { event.preventDefault(); setSel(flat.length - 1, true); }
      else if (key === 'Enter') {
        event.preventDefault();
        const entry = flat[sel];
        if (!entry) return;
        if (entry.cmd) { palette.close(); entry.cmd.run(); }
        else { $('#jp-opt-' + sel, listEl).click(); }
      } else if (key === 'Backspace' && !input.value) { /* nothing to clear */ }
    }
    function openPalette(prefill = '') {
      if (!palette) buildPalette();
      if (palette.open) return;
      if (anyDialogOpen()) return;
      opener = document.activeElement;
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      input.placeholder = t('placeholder');
      input.setAttribute('aria-label', t('label'));
      palette.setAttribute('aria-label', t('label'));
      $('[data-jp-close]', palette).setAttribute('aria-label', t('hClose'));
      hintEl.innerHTML = '<span><kbd>↑</kbd><kbd>↓</kbd> ' + esc(t('hSel')) + '</span><span><kbd>↵</kbd> ' + esc(t('hOpen')) + '</span><span><kbd>esc</kbd> ' + esc(t('hClose')) + '</span><span class="jp-opt"><kbd>&gt;</kbd> ' + esc(t('hCmd')) + '</span>';
      input.value = prefill;
      render();
      palette.showModal();
      input.focus({ preventScroll: true });
    }
    function togglePalette() { palette?.open ? palette.close() : openPalette(); }
    // The old quick-search entry points now open the palette.
    if (window.JYLibrary) window.JYLibrary.openSearch = () => openPalette();

    /* ------------------------------------------------------------ help */
    function openHelp() {
      if (anyDialogOpen()) return;
      let dialog = $('#jy-help');
      if (!dialog) {
        dialog = document.createElement('dialog');
        dialog.id = 'jy-help';
        document.body.append(dialog);
        listen(dialog, 'click', event => { if (event.target === dialog || event.target.closest('[data-jh-close]')) dialog.close(); });
        listen(dialog, 'close', () => { document.body.style.overflow = ''; });
      }
      const row = (keys, label) => '<div><dt>' + keys.map(k => '<kbd>' + esc(k) + '</kbd>').join('') + '</dt><dd>' + esc(label) + '</dd></div>';
      dialog.setAttribute('aria-label', t('helpTitle'));
      dialog.innerHTML = '<div class="jh-shell"><div class="jh-head"><h2>' + esc(t('helpTitle')) + '</h2><button type="button" class="jp-esc" data-jh-close aria-label="' + esc(t('hClose')) + '"><kbd>esc</kbd></button></div><dl>' +
        row([MOD, 'K'], t('kOpen')) + row(['/'], t('kOpen')) + row(['J', 'K'], t('kMove')) + row(['←', '↑', '↓', '→'], t('kArrows')) + row(['F'], t('kFav')) + row(['T'], t('kTheme')) +
        (platformTabs().length ? row(['1', '…', '9'], t('kTab')) : '') + row(['G', 'H'], t('kHome')) + ($('.back') ? row(['B'], t('kBack')) : '') + row(['?'], t('kHelp')) + '</dl></div>';
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    }

    /* ------------------------------------------------------------ keyboard */
    const cardSelector = 'a.resource-card, a.hub-card, a.featured-card';
    let goPending = 0;
    function visibleCards() { return $$(cardSelector).filter(card => card.offsetParent !== null && !card.closest('[hidden]')); }
    function stepCard(direction) {
      const cards = visibleCards();
      if (!cards.length) return;
      let at = cards.indexOf(document.activeElement);
      if (at < 0) at = direction > 0 ? cards.findIndex(card => card.getBoundingClientRect().bottom > 90) - 1 : cards.length;
      const next = cards[Math.min(cards.length - 1, Math.max(0, at + direction))];
      next.focus({ preventScroll: true });
      next.scrollIntoView({ block: 'center', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
    function moveCard(direction) {
      const cur = document.activeElement, cards = visibleCards().filter(card => card !== cur);
      const a = cur.getBoundingClientRect(), ax = a.left + a.width / 2, ay = a.top + a.height / 2;
      let best = null, bestScore = Infinity;
      for (const card of cards) {
        const r = card.getBoundingClientRect(), dx = r.left + r.width / 2 - ax, dy = r.top + r.height / 2 - ay;
        const along = direction === 'Right' ? dx : direction === 'Left' ? -dx : direction === 'Down' ? dy : -dy;
        const across = direction === 'Right' || direction === 'Left' ? Math.abs(dy) : Math.abs(dx);
        if (along < 8) continue;
        const score = along + across * 2.2;
        if (score < bestScore) { bestScore = score; best = card; }
      }
      if (!best) return;
      best.focus({ preventScroll: true });
      best.scrollIntoView({ block: 'center', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
    listen(window, 'keydown', event => {
      if (event.isComposing || event.keyCode === 229) return;
      if (cur > 0) {
        if (event.key === 'Escape') { event.preventDefault(); request(0); }
        return;
      }
      const mod = event.ctrlKey || event.metaKey;
      if (mod && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'k') {
        if (palette?.open || !anyDialogOpen()) { event.preventDefault(); event.stopImmediatePropagation(); togglePalette(); }
        return;
      }
      if (event.key === '/' && !mod && !event.altKey && !typingTarget(event.target) && !anyDialogOpen()) {
        event.preventDefault(); event.stopImmediatePropagation(); openPalette(); return;
      }
      if (typingTarget(event.target) || anyDialogOpen() || mod || event.altKey || event.repeat) return;
      const key = event.key;
      if (key === '?') { event.preventDefault(); openHelp(); }
      else if (key === 'j' || key === 'k') { event.preventDefault(); stepCard(key === 'j' ? 1 : -1); }
      else if (key.startsWith('Arrow') && document.activeElement?.matches?.(cardSelector)) { event.preventDefault(); moveCard(key.slice(5)); }
      else if (key === 'b') { $('.back')?.click(); }
      else if (key === 'f') { document.activeElement?.closest?.('.library-entry')?.querySelector('[data-library-action="favorite"]')?.click(); }
      else if (key === 't') {
        const order = ['auto', 'light', 'dark'], next = order[(order.indexOf(themePref()) + 1) % order.length];
        setTheme(next); toast(t('themeNow', { m: t(next) }));
      } else if (key === 'g') { goPending = Date.now(); }
      else if (key === 'h' && Date.now() - goPending < 900) { goPending = 0; visit('/index.html', false); }
      else if (/^[1-9]$/.test(key)) { const tab = platformTabs()[Number(key) - 1]; if (tab) { event.preventDefault(); tab.click(); tab.focus({ preventScroll: true }); } }
    }, true);

    /* Home filter box: Esc clears, Enter opens the first visible result. */
    function wireFilterBox() {
      const box = $('#search');
      if (!box) return;
      listen(box, 'keydown', event => {
        if (event.isComposing || event.keyCode === 229) return;
        if (event.key === 'Escape' && box.value) { event.preventDefault(); box.value = ''; box.dispatchEvent(new Event('input', { bubbles: true })); }
        else if (event.key === 'Enter') { const first = $$('#resource-grid a.resource-card')[0]; if (first) { event.preventDefault(); first.click(); } }
      });
    }

    /* ------------------------------------------------------------ download pages */
    const platformTabs = () => $$('.platform-tabs [data-platform]');
    function detectPlatform() {
      const ua = navigator.userAgent || '', platform = navigator.userAgentData?.platform || navigator.platform || '';
      if (/android/i.test(ua)) return 'android';
      if (/iphone|ipad|ipod/i.test(ua) || /Mac/i.test(platform) && navigator.maxTouchPoints > 1) return 'ios';
      if (/win/i.test(platform) || /windows/i.test(ua)) return 'windows';
      if (/mac/i.test(platform)) return 'macos';
      return /linux|x11/i.test(platform + ua) ? 'linux' : '';
    }
    let applying = false;
    function wirePlatforms() {
      const group = $('.platform-tabs');
      const tabs = platformTabs();
      if (!group || !tabs.length) return;
      const detected = detectPlatform();
      const recommended = tabs.find(tab => tab.dataset.platform === detected);
      if (recommended) {
        const title = recommended.getAttribute('title');
        onExit(() => { delete recommended.dataset.rec; if (title === null) recommended.removeAttribute('title'); else recommended.title = title; });
        recommended.dataset.rec = '1'; recommended.title = t('rec'); }
      const known = name => name && tabs.some(tab => tab.dataset.platform === name);
      const fromHash = OFFLINE ? '' : location.hash.slice(1);
      const wanted = [fromHash, read('jy-platform', ''), detected].find(known);
      const current = tabs.find(tab => tab.classList.contains('active'));
      if (wanted && current?.dataset.platform !== wanted) {
        applying = true;
        tabs.find(tab => tab.dataset.platform === wanted).click();
        applying = false;
        if (wanted === fromHash) write('jy-platform', wanted);
      }
      listen(group, 'click', event => {
        const tab = event.target.closest('[data-platform]');
        if (!tab || applying) return;
        write('jy-platform', tab.dataset.platform);
        if (!OFFLINE) { try { history.replaceState(null, '', '#' + tab.dataset.platform); } catch {} }
      }, true);
      if (!OFFLINE) listen(window, 'hashchange', () => { const name = location.hash.slice(1); if (known(name)) tabs.find(tab => tab.dataset.platform === name).click(); });
    }
    /* Arrow-key navigation inside platform tab lists. */
    function wireTabKeys() {
      $$('.platform-tabs[role="tablist"]').forEach(group => {
        const tabs = $$('button[role="tab"]:not(:disabled)', group);
        const stops = tabs.map(tab => tab.getAttribute('tabindex'));
        onExit(() => tabs.forEach((tab, i) => stops[i] === null ? tab.removeAttribute('tabindex') : tab.setAttribute('tabindex', stops[i])));
        const syncStops = () => {
          const selected = tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0];
          tabs.forEach(tab => { tab.tabIndex = tab === selected ? 0 : -1; });
        };
        listen(group, 'keydown', event => {
          if (event.altKey || event.ctrlKey || event.metaKey) return;
          const index = tabs.indexOf(event.target);
          if (index < 0) return;
          let next;
          if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
          else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
          else if (event.key === 'Home') next = 0;
          else if (event.key === 'End') next = tabs.length - 1;
          else return;
          event.preventDefault();
          tabs[next].focus(); tabs[next].click(); syncStops();
        });
        observe(MutationObserver, syncStops).observe(group, { subtree: true, attributes: true, attributeFilter: ['aria-selected'] });
        syncStops();
      });
    }


    /* ------------------------------------------------------------ tabs & segmented controls */
    /* One sliding ink bar under whichever button is active. */
    function wireInk(group, activeTest) {
      if (!group || group.dataset.ink) return;
      group.dataset.ink = '1';
      group.classList.add('jy-inked');
      const ink = document.createElement('i');
      ink.className = 'jy-ink';
      ink.setAttribute('aria-hidden', 'true');
      group.prepend(ink);
      const buttons = () => $$('button', group);
      let first = true, queued = 0;
      const place = () => {
        queued = 0;
        const on = buttons().find(activeTest);
        if (!on || !on.offsetWidth) { ink.style.opacity = '0'; return; }
        if (first) { ink.style.transition = 'none'; }
        ink.style.opacity = '1';
        ink.style.width = on.offsetWidth + 'px';
        ink.style.height = on.offsetHeight + 'px';
        ink.style.transform = 'translate(' + on.offsetLeft + 'px,' + on.offsetTop + 'px)';
        if (first) { ink.offsetWidth; ink.style.transition = ''; first = false; }
      };
      const schedule = () => { if (!queued) queued = nextFrame(place); };
      observe(MutationObserver, schedule).observe(group, { subtree: true, attributes: true, attributeFilter: ['class', 'aria-pressed', 'aria-selected'] });
      observe(MutationObserver, schedule).observe(group, { subtree: true, childList: true, characterData: true });
      if (window.ResizeObserver) observe(ResizeObserver, schedule).observe(group);
      listen(window, 'resize', schedule, { passive: true });
      document.fonts?.ready?.then(schedule);
      place();
    }
    function wireFilters() {
      const group = $('.filters');
      if (!group) return;
      wireInk(group, b => b.classList.contains('active'));
      // count badges come from the catalog; they live in an attribute so the page's own i18n can't wipe them
      const home = catalog.filter(item => item.home);
      const count = id => id === 'all' ? home.length : home.filter(item => item.category === id || (id === 'tools' && item.category === 'computer')).length;
      $$('[data-category]', group).forEach(button => { button.dataset.n = String(count(button.dataset.category)); });
    }
    function wireViewToggle() {
      const hook = () => {
        const buttons = $$('[data-library-view]');
        if (!buttons.length) return false;
        wireInk(buttons[0].parentElement, b => b.getAttribute('aria-pressed') === 'true');
        return true;
      };
      if (hook()) return;
      const watcher = observe(MutationObserver, () => { if (hook()) watcher.disconnect(); });
      watcher.observe(document.body, { childList: true, subtree: true });
      later(() => watcher.disconnect(), 8000);
    }
    /* Download pages: direction-aware content swap, number hints, swipe between platforms. */
    function wireTabMotion() {
      const group = $('.platform-tabs');
      const tabs = platformTabs();
      if (!group || tabs.length < 2) return;
      tabs.forEach((tab, i) => { tab.dataset.key = String(i + 1); });
      const swapTargets = ['#platform-art', '#platform-title', '#platform-description', '#platform-details', '#download-link', '#download-link-secondary', '#platform-label', '#platform-name']
        .map(sel => $(sel)).filter(Boolean);
      let from = tabs.findIndex(tab => tab.classList.contains('active'));
      listen(group, 'click', event => {
        const tab = event.target.closest('[data-platform]');
        if (!tab) return;
        const to = tabs.indexOf(tab);
        if (to === from) return;
        root.style.setProperty('--tab-dir', to > from ? '1' : '-1');
        from = to;
        if (reducedMotion.matches) return;
        swapTargets.forEach(el => { el.classList.remove('jy-swap'); });
        void group.offsetWidth;
        swapTargets.forEach((el, i) => { el.style.setProperty('--swap-i', String(i)); el.classList.add('jy-swap'); });
      }, true);
      const area = $('#platform-title')?.closest('section, main') || document.body;
      let x0 = 0, y0 = 0, t0 = 0;
      listen(area, 'touchstart', e => { if (e.touches.length !== 1 || e.target.closest('input,textarea,.platform-tabs')) { t0 = 0; return; } x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now(); }, { passive: true });
      listen(area, 'touchend', e => {
        if (!t0 || Date.now() - t0 > 600) return;
        const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
        if (Math.abs(dx) < 64 || Math.abs(dy) > Math.abs(dx) * .6) return;
        const now = tabs.findIndex(tab => tab.classList.contains('active'));
        const next = tabs[now + (dx < 0 ? 1 : -1)];
        if (next) next.click();
      }, { passive: true });
    }

    /* ------------------------------------------------------------ home: shareable filter state, hit highlight, empty state */
    function markText(el, q) {
      const lq = q.toLocaleLowerCase(), walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        const at = node.data.toLocaleLowerCase().indexOf(lq);
        if (at < 0) return;
        const rest = node.splitText(at); rest.splitText(q.length);
        const mark = document.createElement('mark'); mark.className = 'jy-hit'; mark.textContent = rest.data; rest.replaceWith(mark);
      });
    }
    function wireHome() {
      const box = $('#search'), cats = $$('[data-category]');
      if (!box || !cats.length) return;
      listen(document, 'jy:resources-rendered', () => {
        const q = box.value.trim();
        if (q) $$('#resource-grid .resource-card h3, #resource-grid .resource-card p').forEach(el => markText(el, q));
        const empty = $('#resource-grid .empty');
        if (empty && !empty.querySelector('button')) {
          const button = document.createElement('button');
          button.type = 'button'; button.className = 'jy-clear'; button.textContent = t('clear');
          listen(button, 'click', () => { box.value = ''; $('[data-category="all"]')?.click(); box.dispatchEvent(new Event('input', { bubbles: true })); box.focus(); });
          empty.append(button);
        }
      });
      if (OFFLINE) return;
      const params = new URLSearchParams(location.search), c = params.get('c'), q = params.get('q');
      if (c && c !== 'all') cats.find(button => button.dataset.category === c)?.click();
      if (q) { box.value = q.slice(0, 80); box.dispatchEvent(new Event('input', { bubbles: true })); }
      let timer = 0;
      const save = () => {
        const next = new URLSearchParams(location.search);
        next.delete('c');
        next.delete('q');
        const active = $('[data-category].active')?.dataset.category;
        if (active && active !== 'all') next.set('c', active);
        if (box.value.trim()) next.set('q', box.value.trim());
        const qs = next.toString();
        try { history.replaceState(history.state, '', location.pathname + (qs ? '?' + qs : '') + location.hash); } catch {}
      };
      listen(document, 'click', event => { if (event.target.closest('[data-category]')) later(save, 0); }, true);
      listen(box, 'input', () => { clearTimeout(timer); timer = later(save, 250); });
    }
    listen(document, 'click', event => {
      const button = event.target.closest?.('[data-library-action="favorite"]');
      if (!button) return;
      const id = button.dataset.entryId;
      later(() => toast(t(storedIds('jy-favorites').includes(id) ? 'favOn' : 'favOff')), 60);
    }, true);

    /* ------------------------------------------------------------ chrome */
    /* ------------------------------------------------------------ dock screens (App Store-style tabs) */
    const SCREEN_KEYS = ['home', 'search', 'fav', 'set'];
    let cur = 0, layer = null, searchQuery = '', searchCat = 'all', syncDock = () => {};
    const phone = () => matchMedia('(max-width: 700px)').matches;
    let inertBackground = [];
    const favIds = () => window.JYLibrary.favoriteIds().filter(id => byId.has(id));
    function toggleFav(id) {
      window.JYLibrary.toggleFavorite(id);
      return favIds().includes(id);
    }
    const starSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8L12 3.5Z"/></svg>';
    function rowHtml(item, index) {
      const [title, desc] = localized(item), external = !item.internal, fav = favIds().includes(item.id);
      return '<div class="jy-row" style="--ri:' + Math.min(index, 12) + '"><a class="jp-item" href="' + esc(item.url) + '"' + (external ? ' target="_blank" rel="noopener noreferrer"' : '') + ' data-id="' + esc(item.id) + '">' +
        '<span class="jp-ico">' + esc(item.glyph || '·') + '</span><span class="jp-text"><span class="jp-title">' + esc(title) + '</span><span class="jp-sub">' + esc(item.domain || desc || '') + '</span></span>' +
        '<span class="jp-meta">' + esc(categoryName(item)) + ' ' + (external ? '↗' : '→') + '</span></a>' +
        '<button type="button" class="jy-star" data-star="' + esc(item.id) + '" aria-pressed="' + fav + '" aria-label="' + esc(t(fav ? 'sUnstar' : 'sStar') + ' · ' + title) + '">' + starSvg + '</button></div>';
    }
    function renderSearch(pane) {
      const body = $('.js-body', pane);
      const cats = ['all', ...new Set(catalog.map(item => item.category))];
      let chips = $('.js-chips', body), input = $('input', body), list = $('.js-list', body);
      if (!input) {
        body.innerHTML = '<label class="js-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input type="search" enterkeyhint="search" autocomplete="off" autocapitalize="off" spellcheck="false"></label><div class="js-chips" role="group"></div><div class="js-list"></div>';
        input = $('input', body); chips = $('.js-chips', body); list = $('.js-list', body);
        input.addEventListener('input', () => { searchQuery = input.value; fill(); });
        chips.addEventListener('click', event => { const b = event.target.closest('[data-cat]'); if (b) { searchCat = b.dataset.cat; fillChips(); fill(); } });
      }
      input.value = searchQuery; input.placeholder = t('sFind'); input.setAttribute('aria-label', t('sFind'));
      function fillChips() { chips.innerHTML = cats.map(c => '<button type="button" class="js-chip" data-cat="' + esc(c) + '" aria-pressed="' + (c === searchCat) + '">' + esc(c === 'all' ? t('sAll') : window.JYLibrary?.text ? window.JYLibrary.text(c) : c) + '</button>').join(''); }
      function fill() {
        const q = searchQuery.trim(), nq = norm(q);
        let items = catalog.filter(item => searchCat === 'all' || item.category === searchCat);
        if (nq) items = items.map(item => ({ item, s: resourceScore(item, q, nq) })).filter(h => h.s >= 0).sort((a, b) => a.s - b.s).map(h => h.item);
        else items = [...items].sort((a, b) => (b.home ? 1 : 0) - (a.home ? 1 : 0));
        list.innerHTML = items.length ? items.slice(0, 60).map(rowHtml).join('') : '<p class="js-empty">' + esc(t('sNoHit')) + '</p>';
      }
      fillChips(); fill();
    }
    function renderFav(pane) {
      const body = $('.js-body', pane);
      const items = favIds().map(id => byId.get(id));
      body.innerHTML = items.length ? '<div class="js-list">' + items.map(rowHtml).join('') + '</div>' :
        '<div class="js-emptybox"><div class="js-bigstar">' + starSvg + '</div><p>' + esc(t('sFavEmpty')) + '</p><button type="button" class="jy-clear" data-goto="search">' + esc(t('sGoSearch')) + '</button></div>';
      const recent = storedIds('jy-recent').filter(id => byId.has(id)).slice(0, 5).map(id => byId.get(id));
      if (recent.length) body.insertAdjacentHTML('beforeend', '<h2 class="js-label">' + esc(t('recent')) + '</h2><div class="js-list">' + recent.map(rowHtml).join('') + '</div>');
    }
    function renderSet(pane) {
      const body = $('.js-body', pane);
      const group = (label, buttons, kind, activeOf) => buttons.length ? '<section class="js-group"><h2 class="js-label">' + esc(label) + '</h2><div class="js-opts">' +
        buttons.map((b, i) => {
          const dot = kind === 'accent' ? '<i class="js-dot" style="background:' + esc(b.querySelector('.swatch-dot')?.style.getPropertyValue('--swatch') || 'var(--sig)') + '"></i>' : '';
          return '<button type="button" class="js-opt" data-proxy="' + kind + ':' + i + '" aria-pressed="' + activeOf(b) + '">' + dot + esc(b.textContent.trim()) + '</button>';
        }).join('') + '</div></section>' : '';
      const modes = $$('[data-mode]'), accents = $$('[data-accent-choice]'), langs = $$('[data-language]'), views = $$('[data-library-view]');
      body.innerHTML =
        group(t('sAppear'), modes, 'mode', b => b.classList.contains('active') || b.getAttribute('aria-pressed') === 'true' || b.getAttribute('aria-selected') === 'true') +
        group(t('sAccent'), accents, 'accent', b => b.classList.contains('active') || b.getAttribute('aria-pressed') === 'true') +
        group(t('sLang'), langs, 'lang', b => b.dataset.language === root.lang) +
        group(t('sLayout'), views, 'view', b => b.getAttribute('aria-pressed') === 'true');
      body._proxy = { mode: modes, accent: accents, lang: langs, view: views };
    }
    const RENDER = { 1: renderSearch, 2: renderFav, 3: renderSet };
    const TITLE = { 1: 'sSearch', 2: 'sFavTitle', 3: 'sSetTitle' };
    function buildLayer() {
      if (layer) return;
      layer = document.createElement('div');
      layer.id = 'jy-screens';
      layer.innerHTML = [1, 2, 3].map(i => '<section class="jy-screen" data-screen="' + SCREEN_KEYS[i] + '" data-pos="right" inert aria-hidden="true"><header class="js-head"><h1></h1></header><div class="js-body"></div></section>').join('');
      document.body.append(layer);
      onExit(() => {
        layer.remove();
        root.classList.remove('jy-screen-open');
        inertBackground.forEach(element => { element.inert = false; });
      });
      layer.addEventListener('click', event => {
        const star = event.target.closest('[data-star]');
        if (star) { const on = toggleFav(star.dataset.star); if (cur === 2) refreshScreen(); else { star.setAttribute('aria-pressed', String(on)); star.setAttribute('aria-label', t(on ? 'sUnstar' : 'sStar') + ' · ' + localized(byId.get(star.dataset.star))[0]); } return; }
        const go = event.target.closest('[data-goto]');
        if (go) { request(SCREEN_KEYS.indexOf(go.dataset.goto)); return; }
        const opt = event.target.closest('[data-proxy]');
        if (opt) { const [kind, i] = opt.dataset.proxy.split(':'); $('.js-body', opt.closest('.jy-screen'))._proxy[kind][Number(i)]?.click(); later(refreshScreen, 80); return; }
        const row = event.target.closest('a.jp-item[data-id]');
        if (row) { rememberVisit(row.dataset.id); if (cur === 1) window.JYLibrary.rememberSearch(searchQuery); }
      });
      observe(MutationObserver, () => later(refreshScreen, 90)).observe(root, { attributes: true, attributeFilter: ['lang'] });
    }
    function refreshScreen() {
      if (!layer || cur < 1) return;
      const pane = $('[data-screen="' + SCREEN_KEYS[cur] + '"]', layer);
      $('h1', pane).textContent = t(TITLE[cur]);
      const scroller = pane.scrollTop;
      RENDER[cur](pane);
      pane.scrollTop = scroller;
    }
    function apply(next) {
      if (next === cur) return;
      buildLayer();
      const previous = cur;
      cur = next;
      if (!previous && cur) {
        inertBackground = [...document.body.children].filter(element =>
          element.matches('header, nav, main, footer, #top') && !element.matches('.jy-dock') && !element.inert);
        inertBackground.forEach(element => { element.inert = true; });
      } else if (!cur) {
        inertBackground.forEach(element => { element.inert = false; });
        inertBackground = [];
        if (layer.contains(document.activeElement)) $('[data-dock="' + SCREEN_KEYS[previous] + '"]')?.focus({ preventScroll: true });
      }
      $$('.jy-screen', layer).forEach((pane, i) => {
        const index = i + 1;
        pane.dataset.pos = index < cur ? 'left' : index > cur ? 'right' : 'center';
        const active = index === cur;
        pane.toggleAttribute('inert', !active); pane.setAttribute('aria-hidden', String(!active));
      });
      layer.classList.toggle('open', cur > 0);
      root.classList.toggle('jy-screen-open', cur > 0);
      if (cur > 0) {
        refreshScreen();
        const pane = $('[data-screen="' + SCREEN_KEYS[cur] + '"]', layer);
        pane.scrollTop = 0;
        const title = $('h1', pane);
        title.tabIndex = -1;
        title.focus({ preventScroll: true });
      }
      $('.jy-dock')?.classList.remove('away');
      syncDock();
    }
    /* History: opening a screen from the page adds one entry, so the system Back gesture closes it. */
    function request(next) {
      if (!phone() || !$('.jy-dock') || !Number.isInteger(next) || next < 0 || next >= SCREEN_KEYS.length || next === cur) return;
      if (next === 0) { if (!OFFLINE && history.state?.jyScreen) history.back(); else apply(0); return; }
      if (!OFFLINE) {
        const state = { ...(history.state || {}), jyScreen: next };
        try { if (cur === 0) history.pushState(state, ''); else history.replaceState(state, ''); } catch {}
      }
      apply(next);
    }
    function restoreScreen() {
      const next = history.state?.jyScreen;
      apply(phone() && Number.isInteger(next) && next > 0 && next < SCREEN_KEYS.length && $('.jy-dock') ? next : 0);
    }
    listen(window, 'popstate', restoreScreen);
    listen(window, 'resize', () => { if (cur > 0 && !phone()) apply(0); }, { passive: true });
    listen(window, 'storage', event => {
      if (cur && (!event.key || ['jy-favorites','jy-recent'].includes(event.key))) refreshScreen();
    });
    window.JYScreens = { go: request, current: () => cur };
    onExit(() => { delete window.JYScreens; });

    /* ------------------------------------------------------------ mobile dock */
    function addDock() {
      if ($('.jy-dock') || !$('#settings-trigger')) return;
      const icon = d => '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>';
      const items = [
        ['home', 'dHome', 'M3 11.5 12 4l9 7.5M5.5 10v10h13V10'],
        ['search', 'dSearch', 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM16 16l5 5'],
        ['fav', 'dFav', 'm12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8L12 3.5Z'],
        ['set', 'dSet', 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14.2 3h-4l-.4 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2l.4 2.6h4l.4-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z']
      ];
      const dock = document.createElement('nav');
      dock.className = 'jy-dock';
      dock.innerHTML = items.map(([key, word, path]) => '<button type="button" data-dock="' + key + '">' + icon(path) + '<span data-dword="' + word + '"></span></button>').join('');
      document.body.append(dock);
      onExit(() => dock.remove());
      const label = () => { dock.setAttribute('aria-label', t('dNav')); $$('[data-dword]', dock).forEach(el => { el.textContent = t(el.dataset.dword); }); };
      label();
      observe(MutationObserver, label).observe(root, { attributes: true, attributeFilter: ['lang'] });
      const onHome = () => !!$('#resource-grid');
      const buttons = $$('button', dock);
      const lens = index => dock.style.setProperty('--i', String(index));
      let settleTimer;
      const sync = () => {
        const index = cur > 0 ? cur : onHome() ? 0 : -1;
        buttons.forEach((button, i) => {
          button.classList.toggle('on', i === index);
          if (i === index) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
        });
        if (dock.classList.contains('pressing')) return;
        const at = buttons.findIndex(button => button.classList.contains('on'));
        dock.classList.toggle('lens-off', at < 0);
        if (at >= 0) lens(at);
      };
      listen(dock, 'pointerdown', event => {
        const at = buttons.indexOf(event.target.closest('button'));
        if (at < 0) return;
        clearTimeout(settleTimer);
        dock.classList.remove('lens-off');
        dock.classList.add('pressing');
        lens(at);
      });
      const release = () => {
        if (!dock.classList.contains('pressing')) return;
        dock.classList.remove('pressing');
        settleTimer = later(sync, 260);
      };
      syncDock = sync;
      for (const event of ['pointerup', 'pointercancel', 'pointerleave']) listen(dock, event, release);
      listen(dock, 'click', event => {
        const button = event.target.closest('[data-dock]');
        if (!button) return;
        const key = button.dataset.dock, index = SCREEN_KEYS.indexOf(key);
        if (key === 'home') {
          if (cur > 0) request(0);
          else if (onHome()) scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
          else visit('/index.html', false);
        } else if (index === cur) {
          const pane = $('[data-screen="' + key + '"]', layer); pane?.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
        } else request(index);
      });
      // slide away while reading downward, return on scroll up or when idle at the end
      let last = scrollY, ticking = false;
      listen(window, 'scroll', () => {
        if (ticking || cur > 0) return; ticking = true;
        nextFrame(() => {
          ticking = false;
          const y = scrollY, delta = y - last;
          if (Math.abs(delta) > 6) { dock.classList.toggle('away', delta > 0 && y > 160); last = y; }
          if (y < 80 || innerHeight + y >= root.scrollHeight - 40) dock.classList.remove('away');
          sync();
        });
      }, { passive: true });
      restoreScreen();
      sync();
      listen(document, 'focusout', () => later(() => { if (!typingTarget(document.activeElement)) dock.classList.remove('away'); }, 50));
      listen(document, 'focusin', event => { if (typingTarget(event.target) && !event.target.closest('dialog')) dock.classList.add('away'); });
    }

    function addNavChip() {
      const trigger = $('#settings-trigger');
      if (!trigger || $('.jy-cmd')) return;
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'jy-cmd';
      chip.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span class="jy-cmd-keys"><kbd>' + esc(MOD) + '</kbd><kbd>K</kbd></span>';
      const label = () => { chip.setAttribute('aria-label', t('label')); chip.title = t('label') + ' (' + MOD + ' K)'; };
      label();
      observe(MutationObserver, label).observe(root, { attributes: true, attributeFilter: ['lang'] });
      listen(chip, 'click', () => openPalette());
      if (trigger.parentElement.classList.contains('controls')) trigger.before(chip);
      else { // pages whose nav has no controls group: keep chip + settings together on the right
        const wrap = document.createElement('div');
        wrap.className = 'jy-ctl';
        trigger.before(wrap);
        wrap.append(chip, trigger);
      }
    }
    function addProgress() {
      const bar = document.createElement('div');
      bar.id = 'jy-progress';
      bar.setAttribute('aria-hidden', 'true');
      bar.innerHTML = '<i></i>';
      document.body.prepend(bar);
      const fill = bar.firstChild;
      let ticking = false;
      const update = () => {
        ticking = false;
        const max = root.scrollHeight - innerHeight;
        fill.style.transform = 'scaleX(' + (max > 40 ? Math.min(1, scrollY / max) : 0) + ')';
      };
      listen(window, 'scroll', () => { if (!ticking) { ticking = true; nextFrame(update); } }, { passive: true });
      listen(window, 'resize', update, { passive: true });
      update();
    }
    /* Cursor spotlight for panels (pointer devices only). */
    const panels = '.resource-card, .hub-card, .featured-card, .download-card, .favorite-entry';
    let frame = 0, last = null;
    listen(document, 'pointermove', event => {
      if (event.pointerType === 'touch') return;
      last = event;
      if (frame) return;
      frame = nextFrame(() => {
        frame = 0;
        const el = last.target.closest && last.target.closest(panels);
        if (!el) return;
        const box = el.getBoundingClientRect();
        const x = last.clientX - box.left, y = last.clientY - box.top;
        el.style.setProperty('--mx', x + 'px');
        el.style.setProperty('--my', y + 'px');
        if (!reducedMotion.matches && box.width && !el.closest('[data-view="list"]')) {
          el.style.setProperty('--ry', ((x / box.width - .5) * 8).toFixed(2) + 'deg');
          el.style.setProperty('--rx', ((.5 - y / box.height) * 7).toFixed(2) + 'deg');
        }
      });
    }, { passive: true });
    listen(document, 'pointerout', event => {
      const el = event.target.closest?.(panels);
      if (el && !el.contains(event.relatedTarget)) { el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); }
    }, { passive: true });

    /* Cards fade/slide in as they scroll into view, staggered within each batch. */
    function wireReveal() {
      if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
      const selector = '.resource-card, .hub-card, .featured-card, .favorite-entry, .next-step';
      root.classList.add('jy-reveal');
      // Replays every time: a card re-arms once it is fully off-screen and animates again on re-entry,
      // sliding in from whichever edge (top or bottom) it arrives from.
      const io = observe(IntersectionObserver, entries => {
        const middle = innerHeight / 2;
        entries.filter(e => !e.isIntersecting && e.target.classList.contains('jy-in')).forEach(e => e.target.classList.remove('jy-in'));
        entries.filter(e => e.isIntersecting && e.intersectionRatio >= 0.06 && !e.target.classList.contains('jy-in'))
          .sort((x, y) => x.boundingClientRect.top - y.boundingClientRect.top || x.boundingClientRect.left - y.boundingClientRect.left)
          .forEach((entry, i, all) => {
            const fromTop = entry.boundingClientRect.top < middle - 40 && entry.boundingClientRect.bottom < innerHeight;
            const order = fromTop ? all.length - 1 - i : i;
            entry.target.style.setProperty('--ri', String(Math.min(order, 9)));
            entry.target.style.setProperty('--ey', fromTop ? '-26px' : '26px');
            entry.target.classList.add('jy-in');
          });
      }, { rootMargin: '0px 0px -5% 0px', threshold: [0, 0.06] });
      const scan = () => $$(selector).forEach(el => { if (!el.dataset.rv) { el.dataset.rv = '1'; io.observe(el); } });
      scan();
      observe(MutationObserver, scan).observe(document.body, { childList: true, subtree: true });
      listen(window, 'beforeprint', () => $$(selector).forEach(el => el.classList.add('jy-in')));
    }

    function syncThemeColor() {
      const meta = $('meta[name="theme-color"]');
      if (meta && root.dataset.style === 'tech') meta.content = getComputedStyle(root).getPropertyValue('--bg').trim() || meta.content;
    }
    function buildHud() {
      const hero = $('#hero-top');
      if (root.dataset.style !== 'tech' || !hero || hero.querySelector('.hud')) return;
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
      const modules = $('[data-hud="modules"]', hud), time = $('[data-hud="time"]', hud), theme = $('[data-hud="theme"]', hud);
      const total = $('#resource-total');
      const pad = n => String(n).padStart(2, '0');
      const syncModules = () => { if (total) modules.textContent = pad(total.textContent.trim() || 0); };
      const syncTheme = () => { theme.textContent = (root.dataset.theme || 'dark').toUpperCase() + ' / ' + (root.dataset.accent === 'graphite' ? 'CYAN' : String(root.dataset.accent || '').toUpperCase()); };
      const tick = () => { const d = new Date(); time.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()); };
      syncModules(); syncTheme(); tick();
      if (total) observe(MutationObserver, syncModules).observe(total, { childList: true, characterData: true, subtree: true });
      observe(MutationObserver, () => { syncTheme(); syncThemeColor(); }).observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-accent'] });
      const clock = setInterval(tick, 1000);
      onExit(() => clearInterval(clock));
    }

    function init() {
      addNavChip();
      addDock();
      addProgress();
      buildHud();
      wireFilterBox();
      wirePlatforms();
      wireTabKeys();
      wireFilters();
      wireViewToggle();
      wireTabMotion();
      wireReveal();
      wireHome();
      syncThemeColor();
      observe(MutationObserver, syncThemeColor).observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-accent'] });
      listen($('#settings'), 'close', syncThemeColor);
    }

    init();
    return () => {
      controller.abort();
      transition.remove();
      if (window.JYLibrary) window.JYLibrary.openSearch = previousSearch;
      if (palette?.open) { palette.close(); document.body.style.overflow = savedOverflow; }
      if ($('#jy-help')?.open) { $('#jy-help').close(); document.body.style.overflow = ''; }
      const group = $('.jy-ctl');
      if (group) group.replaceWith($('#settings-trigger', group));
      $$('.jy-cmd,.hud,#jy-progress,#jy-toast,#jy-help,#jy-palette,.jy-ink,.jy-clear').forEach(el => el.remove());
      $$('.jy-hit').forEach(mark => mark.replaceWith(mark.textContent));
      root.classList.remove('jy-reveal');
      root.style.removeProperty('--tab-dir');
      $$('[data-ink],[data-n],[data-rv],[data-key],.jy-swap,.jy-in').forEach(el => {
        for (const key of ['ink','rv','key','n']) delete el.dataset[key];
        el.classList.remove('jy-inked','jy-in','jy-swap');
        el.style.removeProperty('--swap-i');
        el.style.removeProperty('--ri');
        el.style.removeProperty('--ey');
      });
      $$(panels).forEach(el => {
        for (const key of ['--mx','--my','--rx','--ry']) el.style.removeProperty(key);
      });
    };
  }
  let cleanup, mountedStyle = null;
  function sync() {
    if (mountedStyle === root.dataset.style) return;
    cleanup?.();
    mountedStyle = root.dataset.style;
    cleanup = mount();
  }
  function start() {
    if (typeof window.__JYBASE !== 'string' && window.isSecureContext && 'serviceWorker' in navigator) {
      const register = () => navigator.serviceWorker.register('/sw.js').catch(() => {});
      if (document.readyState === 'complete') register();
      else window.addEventListener('load', register, {once: true});
    }
    new MutationObserver(sync).observe(root, {attributes: true, attributeFilter: ['data-style']});
    sync();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true});
  else start();
})();
