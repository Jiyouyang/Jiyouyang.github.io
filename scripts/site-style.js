/* Shared, optional visual styles. Existing page scripts retain ownership of content and controls. */
(() => {
  'use strict';
  const root = document.documentElement;
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  const styles = ['classic', 'terminal', 'mecha'];
  const storedStyle = read('jy-style');
  let style = styles.includes(storedStyle) ? storedStyle : 'classic';
  root.dataset.style = style;

  const copy = {
    'zh-CN': {
      title: '风格调整', classic: '经典', terminal: '终端', mecha: '机甲',
      mechaDescription: '陶瓷装甲 · 精密切角',
      classicDescription: '柔和留白 · 液态玻璃', terminalDescription: '终端面板 · 荧光描边',
      hint: '即时切换，全站生效。每种风格分别记住配色与深浅模式。'
    },
    'zh-TW': {
      title: '風格調整', classic: '經典', terminal: '終端', mecha: '機甲',
      mechaDescription: '陶瓷裝甲 · 精密切角',
      classicDescription: '柔和留白 · 液態玻璃', terminalDescription: '終端面板 · 螢光描邊',
      hint: '即時切換，全站套用。每種風格分別記住配色與深淺模式。'
    },
    en: {
      title: 'Visual style', classic: 'Classic', terminal: 'Terminal', mecha: 'Mecha',
      mechaDescription: 'Ceramic armor · Precision edges',
      classicDescription: 'Soft space · Liquid glass', terminalDescription: 'Console panels · Neon lines',
      hint: 'Switch instantly across the site. Each style remembers its own color and appearance mode.'
    },
    ja: {
      title: 'スタイル', classic: 'クラシック', terminal: 'ターミナル', mecha: 'メカ',
      mechaDescription: 'セラミック装甲・精密なエッジ',
      classicDescription: 'ゆとりの余白・ガラス', terminalDescription: '端末パネル・ネオンの輪郭',
      hint: 'すぐに切り替わり、サイト全体に適用されます。配色と表示モードはスタイルごとに保存されます。'
    }
  };
  // Memory keeps switching usable even when the browser blocks localStorage.
  const preferences = {};
  function currentPreferences() {
    return {
      accent: root.dataset.accent || 'graphite',
      theme: document.querySelector('[data-mode].active')?.dataset.mode || 'auto'
    };
  }
  function savePreferences() {
    preferences[style] = currentPreferences();
    write('jy-style-' + style, JSON.stringify(preferences[style]));
  }
  function savedPreferences(name, fresh = false) {
    let saved = fresh ? null : preferences[name];
    if (!saved) { try { saved = JSON.parse(read('jy-style-' + name)); } catch {} }
    const defaults = {
      classic: { accent: 'graphite', theme: 'auto' },
      terminal: { accent: 'green', theme: 'dark' },
      mecha: { accent: 'orange', theme: 'light' }
    }[name];
    return {
      accent: ['graphite', 'blue', 'violet', 'green', 'orange'].includes(saved?.accent) ? saved.accent : defaults.accent,
      theme: ['auto', 'light', 'dark'].includes(saved?.theme) ? saved.theme : defaults.theme
    };
  }

  function init() {
    const body = document.querySelector('#settings .settings-body');
    if (!body) return;
    const section = document.createElement('section');
    section.className = 'setting-block style-setting';
    section.innerHTML = '<h3 class="setting-label" id="style-label" data-style-text="title"></h3>' +
      '<div class="style-choices" role="group" aria-labelledby="style-label">' +
      styles.map(name => '<button type="button" class="style-choice" data-style-choice="' + name + '" aria-pressed="false">' +
        '<span class="style-preview style-preview-' + name + '" aria-hidden="true"><i></i><i></i><i></i></span>' +
        '<span class="style-choice-title"><span data-style-text="' + name + '"></span><span class="style-check" aria-hidden="true">✓</span></span>' +
        '<span class="style-choice-description" data-style-text="' + name + 'Description"></span></button>').join('') +
      '</div><p class="style-hint" data-style-text="hint"></p>';
    body.prepend(section);

    function sync() {
      const text = copy[root.lang] || copy['zh-CN'];
      section.querySelectorAll('[data-style-text]').forEach(element => { element.textContent = text[element.dataset.styleText]; });
      section.querySelectorAll('[data-style-choice]').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.styleChoice === style));
      });
      // Run after page-specific applyTheme(), so Safari matches the active style's palette.
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = getComputedStyle(root).getPropertyValue('--bg').trim();
    }

    section.addEventListener('click', event => {
      const button = event.target.closest('[data-style-choice]');
      if (!button || button.dataset.styleChoice === style) return;
      savePreferences();
      style = button.dataset.styleChoice;
      const next = savedPreferences(style);
      root.dataset.style = style;
      write('jy-style', style);
      // Reuse existing handlers to keep their in-memory state, ARIA and storage in sync.
      document.querySelector('[data-accent-choice="' + next.accent + '"]')?.click();
      document.querySelector('[data-mode="' + next.theme + '"]')?.click();
      savePreferences();
      sync();
    });

    new MutationObserver(() => { savePreferences(); sync(); }).observe(root, {
      attributes: true, attributeFilter: ['lang', 'data-theme', 'data-accent']
    });
    // A System/Light change may leave data-theme unchanged, but is still a new preference.
    body.addEventListener('click', event => {
      // Internal clicks (including programmatic preference changes) are never backdrop clicks.
      event.stopPropagation();
      if (event.target.closest('[data-mode], [data-accent-choice]')) savePreferences();
    });
    // Safari can restore an old DOM from its back/forward cache after another page changes style.
    window.addEventListener('pageshow', event => {
      const storedStyle = read('jy-style');
      if (!event.persisted || !styles.includes(storedStyle)) return;
      style = storedStyle;
      root.dataset.style = style;
      const next = savedPreferences(style, true);
      document.querySelector('[data-accent-choice="' + next.accent + '"]')?.click();
      document.querySelector('[data-mode="' + next.theme + '"]')?.click();
      const language = read('jy-language');
      if (Object.hasOwn(copy, language)) document.querySelector('[data-language="' + language + '"]')?.click();
      sync();
    });
    savePreferences();
    sync();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
