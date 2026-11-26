(() => {
  const root = document.documentElement;
  function mount() {
    const controller = new AbortController();
    const signal = controller.signal;
    function observe(callback, node, options) {
      const observer = new MutationObserver(callback);
      observer.observe(node, options);
      signal.addEventListener('abort', () => observer.disconnect());
    }
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const isMac = /Mac|iPhone|iPad/i.test(navigator.userAgentData?.platform || navigator.platform || '');
    const MOD = isMac ? '⌘' : 'Ctrl';
    const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    const norm = value => String(value).normalize('NFKC').toLocaleLowerCase().replace(/[\p{P}\p{S}]+/gu, ' ').replace(/\s+/g, ' ').trim();
    const read = (key, fallback) => { try { const raw = localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw); } catch { return fallback; } };
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
      toastTimer = setTimeout(() => el.classList.remove('show'), 1900);
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
    const themePref = () => $('[data-mode].active')?.dataset.mode || 'auto';
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
      if ($('[data-mode=light]') && pref !== 'light') list.push({ label: t('themeLight'), keys: 'light theme appearance 浅色 淺色 ライト', glyph: '◐', run: () => setTheme('light') });
      if ($('[data-mode=dark]') && pref !== 'dark') list.push({ label: t('themeDark'), keys: 'dark theme appearance 深色 ダーク', glyph: '◑', run: () => setTheme('dark') });
      if ($('[data-mode=auto]') && pref !== 'auto') list.push({ label: t('themeAuto'), keys: 'system auto theme appearance 跟随系统 システム', glyph: '◒', run: () => setTheme('auto') });
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
      if (!/\/(index\.html)?$/.test(location.pathname)) list.push({ label: t('goHome'), keys: 'home index 首页 首頁 ホーム', glyph: '⌂', hint: 'g h', run: () => visit('/index.html', false) });
      list.push({ label: t('copyPage'), keys: 'copy link url share 分享 复制', glyph: '⎘', run: copyPage });
      if (catalog.length) list.push({ label: t('random'), keys: 'random surprise lucky 随机 ランダム', glyph: '✦', run: () => { const item = catalog[Math.floor(Math.random() * catalog.length)]; visit(item.url, !item.internal); } });
      list.push({ label: t('help'), keys: 'keyboard shortcuts help 快捷键 キー', glyph: '?', hint: '?', run: () => setTimeout(openHelp, 30) });
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
      input.addEventListener('input', render);
      input.addEventListener('keydown', onPaletteKey);
      palette.addEventListener('click', event => {
        if (event.target === palette || event.target.closest('[data-jp-close]')) { palette.close(); return; }
        const row = event.target.closest('.jp-item');
        if (!row) return;
        const entry = flat[Number(row.dataset.idx)];
        if (entry?.cmd) { event.preventDefault(); palette.close(); entry.cmd.run(); }
        else palette.close(); // anchors navigate on their own
      });
      listEl.addEventListener('mousemove', event => {
        const row = event.target.closest('.jp-item');
        if (row && Number(row.dataset.idx) !== sel) setSel(Number(row.dataset.idx), false);
      });
      palette.addEventListener('close', () => {
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
          const saved = read('jy-favorites', []);
          const favorites = (Array.isArray(saved) ? saved : []).filter(id => byId.has(id)).slice(0, 6).map(id => byId.get(id));
          const items = favorites.length ? favorites : catalog.filter(item => item.home).slice(0, 6);
          groups.push([favorites.length ? t('gFav') : t('gSug'), items.map(item => ({ item }))]);
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
    const originalSearch = window.JYLibrary?.openSearch;
    if (originalSearch) window.JYLibrary.openSearch = openPalette;

    /* ------------------------------------------------------------ help */
    function openHelp() {
      if (signal.aborted || anyDialogOpen()) return;
      let dialog = $('#jy-help');
      if (!dialog) {
        dialog = document.createElement('dialog');
        dialog.id = 'jy-help';
        document.body.append(dialog);
        dialog.addEventListener('click', event => { if (event.target === dialog || event.target.closest('[data-jh-close]')) dialog.close(); });
        dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
      }
      const row = (keys, label) => '<div><dt>' + keys.map(k => '<kbd>' + esc(k) + '</kbd>').join('') + '</dt><dd>' + esc(label) + '</dd></div>';
      dialog.setAttribute('aria-label', t('helpTitle'));
      dialog.innerHTML = '<div class="jh-shell"><div class="jh-head"><h2>' + esc(t('helpTitle')) + '</h2><button type="button" class="jp-esc" data-jh-close aria-label="' + esc(t('hClose')) + '"><kbd>esc</kbd></button></div><dl>' +
        row([MOD, 'K'], t('kOpen')) + row(['/'], t('kOpen')) + row(['J', 'K'], t('kMove')) + row(['F'], t('kFav')) + row(['T'], t('kTheme')) +
        (platformTabs().length ? row(['1', '…', '9'], t('kTab')) : '') + row(['G', 'H'], t('kHome')) + row(['?'], t('kHelp')) + '</dl></div>';
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
    window.addEventListener('keydown', event => {
      if (event.isComposing || event.keyCode === 229) return;
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
      else if (key === 'f') { document.activeElement?.closest?.('.library-entry')?.querySelector('[data-library-action="favorite"]')?.click(); }
      else if (key === 't' && $('[data-mode]')) {
        const order = ['auto', 'light', 'dark'], next = order[(order.indexOf(themePref()) + 1) % order.length];
        setTheme(next); toast(t('themeNow', { m: t(next) }));
      } else if (key === 'g') { goPending = Date.now(); }
      else if (key === 'h' && Date.now() - goPending < 900) { goPending = 0; visit('/index.html', false); }
      else if (/^[1-9]$/.test(key)) { const tab = platformTabs()[Number(key) - 1]; if (tab) { event.preventDefault(); tab.click(); tab.focus({ preventScroll: true }); } }
    }, { capture: true, signal });

    /* Home filter box: Esc clears, Enter opens the first visible result. */
    function wireFilterBox() {
      const box = $('#search');
      if (!box) return;
      box.addEventListener('keydown', event => {
        if (event.isComposing || event.keyCode === 229) return;
        if (event.key === 'Escape' && box.value) { event.preventDefault(); box.value = ''; box.dispatchEvent(new Event('input', { bubbles: true })); }
        else if (event.key === 'Enter') { const first = $$('#resource-grid a.resource-card').find(card => card.offsetParent !== null); if (first) { event.preventDefault(); first.click(); } }
      }, { signal });
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
        recommended.dataset.rec = '1';
        const label = () => { recommended.title = t('rec'); };
        label();
        observe(label, root, { attributes: true, attributeFilter: ['lang'] });
        signal.addEventListener('abort', () => {
          delete recommended.dataset.rec;
          recommended.removeAttribute('title');
        });
      }
      const known = name => name && tabs.some(tab => tab.dataset.platform === name);
      const fromHash = location.hash.slice(1);
      const wanted = [fromHash, read('jy-platform', ''), detected].find(known);
      const current = tabs.find(tab => tab.classList.contains('active'));
      if (wanted && current?.dataset.platform !== wanted) {
        applying = true;
        tabs.find(tab => tab.dataset.platform === wanted).click();
        applying = false;
        if (wanted === fromHash) write('jy-platform', wanted);
      }
      group.addEventListener('click', event => {
        const tab = event.target.closest('[data-platform]');
        if (!tab || applying) return;
        write('jy-platform', tab.dataset.platform);
        try { history.replaceState(history.state, '', '#' + tab.dataset.platform); } catch {}
      }, { capture: true, signal });
      addEventListener('hashchange', () => { const name = location.hash.slice(1); if (known(name)) tabs.find(tab => tab.dataset.platform === name).click(); }, { signal });
    }
    /* Arrow-key navigation inside platform tab lists. */
    function wireTabKeys() {
      $$('.platform-tabs[role="tablist"]').forEach(group => {
        const tabs = $$('button[role="tab"]:not(:disabled)', group);
        const originals = tabs.map(tab => tab.getAttribute('tabindex'));
        signal.addEventListener('abort', () => tabs.forEach((tab, i) => originals[i] === null ? tab.removeAttribute('tabindex') : tab.setAttribute('tabindex', originals[i])));
        const syncStops = () => {
          const selected = tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0];
          tabs.forEach(tab => { tab.tabIndex = tab === selected ? 0 : -1; });
        };
        group.addEventListener('keydown', event => {
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
        }, { signal });
        observe(syncStops, group, { subtree: true, attributes: true, attributeFilter: ['aria-selected'] });
        syncStops();
      });
    }

    /* ------------------------------------------------------------ chrome */
    function addNavChip() {
      const trigger = $('#settings-trigger');
      if (!trigger && !$('.path-bar') || $('.jy-cmd')) return;
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'jy-cmd';
      chip.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span class="jy-cmd-keys"><kbd>' + esc(MOD) + '</kbd><kbd>K</kbd></span>';
      const label = () => { chip.setAttribute('aria-label', t('label')); chip.title = t('label') + ' (' + MOD + ' K)'; };
      label();
      observe(label, root, { attributes: true, attributeFilter: ['lang'] });
      chip.addEventListener('click', () => openPalette());
      if (trigger) trigger.before(chip); else $('.path-bar').append(chip);
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
      addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true, signal });
      addEventListener('resize', update, { passive: true, signal });
      update();
    }

    const transition = document.createElement('style');
    transition.textContent = '@view-transition { navigation: auto; }';
    document.head.append(transition);
    addNavChip();
    addProgress();
    wireFilterBox();
    wirePlatforms();
    wireTabKeys();
    return () => {
      controller.abort();
      transition.remove();
      clearTimeout(toastTimer);
      if (originalSearch) window.JYLibrary.openSearch = originalSearch;
      for (const dialog of $$('#jy-help[open], #jy-palette[open]')) dialog.close();
      for (const el of $$('.jy-cmd,#jy-progress,#jy-help,#jy-palette,#jy-toast')) el.remove();
    };
  }
  let cleanup;
  function sync() {
    if (root.dataset.style === 'tech') cleanup ||= mount();
    else if (cleanup) { cleanup(); cleanup = null; }
  }
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-style'] });
  sync();
})();
