/* District Studio — interacciones del sitio. Sin dependencias. */
(function () {
  'use strict';
  var d = document, w = window, root = d.documentElement;
  var DS = w.DS || {};
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Analítica (solo si está configurada) ---------- */
  function loadScript(src) { var s = d.createElement('script'); s.async = true; s.src = src; d.head.appendChild(s); }
  if (DS.ga4) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.gtag('js', new Date());
    w.gtag('config', DS.ga4);
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(DS.ga4));
  }
  if (DS.metaPixel) {
    /* Meta Pixel base code */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(w, d, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    w.fbq('init', DS.metaPixel);
    w.fbq('track', 'PageView');
  }
  // Un solo punto para medir eventos: DS.track('lead_submit', {...})
  DS.track = function (name, params) {
    try {
      if (w.gtag) w.gtag('event', name, params || {});
      if (w.fbq) {
        if (name === 'lead_submit') w.fbq('track', 'Lead');
        else if (name === 'whatsapp_click') w.fbq('track', 'Contact');
        else w.fbq('trackCustom', name, params || {});
      }
    } catch (e) { /* la medición nunca debe romper la página */ }
  };
  d.addEventListener('click', function (e) {
    var t = e.target.closest('[data-track]');
    if (t) DS.track(t.getAttribute('data-track'), { page: location.pathname });
  });

  /* ---------- Encabezado y menú ---------- */
  var head = d.querySelector('[data-head]');
  var menuBtn = d.querySelector('[data-menu-btn]');
  function setMenu(open) {
    if (!head || !menuBtn) return;
    head.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    d.body.classList.toggle('menu-open', open);
    if (open) { var first = head.querySelector('.sheet a'); if (first) first.focus({ preventScroll: true }); }
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && head.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); } });
    head.querySelector('.sheet').addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    w.addEventListener('resize', function () { if (w.innerWidth >= 960) setMenu(false); });
  }

  /* ---------- Encabezado al bajar y barra fija en el celular ---------- */
  var dock = d.querySelector('[data-dock]');
  if ('IntersectionObserver' in w) {
    var sentinel = d.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none';
    d.body.prepend(sentinel);
    new IntersectionObserver(function (en) { if (head) head.classList.toggle('is-scrolled', !en[0].isIntersecting); }).observe(sentinel);

    if (dock) {
      var anchor = d.querySelector('.hx-actions') || d.querySelector('.page-hero');
      var ends = [].slice.call(d.querySelectorAll('.fin, .site-foot, .inst-pin, .sys-pin, .mani'));
      var pastHero = false, atEnd = false;
      var sync = function () { dock.classList.toggle('is-on', pastHero && !atEnd); };
      if (anchor) new IntersectionObserver(function (en) { pastHero = !en[0].isIntersecting && en[0].boundingClientRect.top < 0; sync(); }).observe(anchor);
      var visibleEnds = new Set();
      var endIO = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) visibleEnds.add(e.target); else visibleEnds.delete(e.target); });
        atEnd = visibleEnds.size > 0; sync();
      });
      ends.forEach(function (el) { endIO.observe(el); });
    }
  }

  var fine = w.matchMedia && w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ---------- Titulares por líneas, recortes de imagen y apariciones ---------- */
  var heads = [].slice.call(d.querySelectorAll('.line')).map(function (l) { return l.closest('h1, h2, h3, .fin-t') || l.parentNode; })
    .filter(function (el, i, arr) { return arr.indexOf(el) === i; });
  var hero = d.querySelector('[data-hero]');
  var clips = [].slice.call(d.querySelectorAll('[data-clip]'));
  if ('IntersectionObserver' in w && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    heads.concat(clips).forEach(function (el) { io.observe(el); });
    d.querySelectorAll('.sec-head, .work-card, .prop, .svc-block, .story-row, .benefit-cols, .principles li, .growth, .grow, .live-list li, .next-case, .chap, .mw').forEach(function (el) {
      if (el.getBoundingClientRect().top > w.innerHeight) { el.classList.add('reveal'); io.observe(el); }
    });
  } else {
    heads.concat(clips).forEach(function (el) { el.classList.add('in'); });
  }
  if (hero) requestAnimationFrame(function () { hero.classList.add('in'); var h1 = hero.querySelector('h1'); if (h1) h1.classList.add('in'); });

  /* ---------- Secciones fijadas: la instalación y el panel ---------- */
  var scrollies = [].slice.call(d.querySelectorAll('[data-scrolly]')).map(function (el) {
    var n = +el.getAttribute('data-scrolly');
    el.style.setProperty('--n', n);
    return { el: el, n: n, step: null, sys: !!el.querySelector('[data-sys]') };
  });
  var sysToasts = ['Producto agregado', 'Precio actualizado', 'Marcado como agotado', 'Cambios guardados', 'Nuevo pedido por WhatsApp'];
  function setInst(s, step) {
    var el = s.el;
    // Solo una pantalla visible: la nueva entra encima y la anterior se apaga cuando ya quedó tapada
    var prevStep = s.step;
    el.querySelectorAll('.dev-scene').forEach(function (sc, i) {
      sc.classList.toggle('is-on', i === step);
      sc.classList.toggle('is-out', i === prevStep && i !== step);
    });
    var cur = el.querySelectorAll('.dev-scene')[step];
    var dev = el.querySelector('[data-dev]');
    if (dev && cur) dev.setAttribute('data-shape', cur.classList.contains('is-web') ? 'web' : 'phone');
    el.querySelectorAll('.inst-list li').forEach(function (li, i) { li.classList.toggle('is-on', i === step); });
    var li = el.querySelectorAll('.inst-list li')[step];
    var count = el.querySelector('[data-count]');
    el.querySelectorAll('.inst-dots button').forEach(function (b, i) { b.classList.toggle('is-on', i === step); });
    if (count) { count.textContent = (step < 9 ? '0' : '') + (step + 1); count.classList.remove('tick'); void count.offsetWidth; count.classList.add('tick'); }
    if (li) {
      var k = el.querySelector('[data-mob-k]'), who = el.querySelector('[data-mob-who]');
      if (k) k.textContent = li.querySelector('.inst-k').textContent;
      if (who) who.textContent = li.querySelector('.inst-who').childNodes[0].textContent + ' · ' + li.querySelector('.inst-who small').textContent;
    }
  }
  var toastTimer;
  function setSys(s, step) {
    var app = s.el.querySelector('.app');
    for (var i = 0; i < s.n; i++) app.classList.toggle('st-' + i, i <= step);
    app.setAttribute('data-step', String(step));
    s.el.querySelectorAll('.sys-steps li').forEach(function (li, i) { li.classList.toggle('is-on', i === Math.max(step, 0)); });
    var toast = app.querySelector('[data-toast]');
    if (toast && step >= 0 && step < s.n - 1) {
      toast.textContent = sysToasts[step] || '';
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 1600);
    } else if (toast) toast.classList.remove('show');
  }
  scrollies.forEach(function (s) { if (s.sys) setSys(s, -1); else setInst(s, 0); s.step = s.sys ? -1 : 0; });

  /* ---------- Línea de tiempo, manifiesto ---------- */
  var tl = d.querySelector('[data-tl]');
  var tlSteps = tl ? [].slice.call(tl.querySelectorAll('.tl-step')) : [];
  var words = d.querySelector('[data-words]');
  var wordEls = [];
  if (words) {
    var txt = words.textContent.trim().split(/\s+/);
    words.innerHTML = txt.map(function (t) { return '<span class="w">' + t + '</span>'; }).join(' ');
    wordEls = [].slice.call(words.querySelectorAll('.w'));
    if (reduce) wordEls.forEach(function (x) { x.classList.add('on'); });
  }

  /* ---------- Hero: profundidad con el mouse y el scroll ---------- */
  var cards = hero ? [].slice.call(hero.querySelectorAll('.hc')).map(function (c) { return { el: c, depth: +c.getAttribute('data-depth') || 0.5 }; }) : [];
  var dot = hero && hero.querySelector('[data-dot]');
  var mx = 0, my = 0, cx = 0, cy = 0, heroOn = false;

  var ticking = false;
  // vh "estable" para las secciones fijadas: el más chico visto hasta ahora, que coincide con
  // el 100svh que usa el CSS. Solo se agranda si el ancho también cambió (giro de pantalla o
  // ventana redimensionada de verdad), nunca por el show/hide de la barra del navegador.
  var stableVh = w.innerHeight, lastW = w.innerWidth;
  function frame() {
    ticking = false;
    var vh = w.innerHeight;
    if (w.innerWidth !== lastW) { lastW = w.innerWidth; stableVh = vh; }
    else if (vh < stableVh) { stableVh = vh; }
    scrollies.forEach(function (s) {
      var r = s.el.getBoundingClientRect();
      // vh estable (no el innerHeight en vivo): en el celular, mostrar/ocultar la barra del
      // navegador AL SCROLLEAR dispara "resize" y cambia innerHeight sin que la persona haya
      // seguido scrolleando; si esa altura se usa aquí, la pantalla activa puede adelantarse
      // sola. El alto de estas secciones se define en CSS con `svh` (estable), así que aquí
      // se usa el mismo innerHeight "chico" ya visto, no el más grande que deja la barra al ocultarse.
      var total = s.el.offsetHeight - stableVh;
      var p = clamp(-r.top / total, 0, 1);
      s.el.style.setProperty('--p', p.toFixed(4));
      var raw = s.sys ? p * (s.n + 0.8) - 1 : p * s.n * 0.999;
      var step = Math.min(s.n - 1, Math.max(0, Math.floor(raw)));
      // margen para que no salte de ida y vuelta en el borde entre dos pantallas
      if (step !== s.step && (s.step === null || Math.abs(raw - (Math.max(step, s.step))) > 0.08)) { if (s.sys) setSys(s, step); else setInst(s, step); s.step = step; }
    });
    if (tl) {
      var tr = tl.getBoundingClientRect();
      tl.style.setProperty('--tp', clamp((vh * 0.62 - tr.top) / tr.height, 0, 1).toFixed(4));
      tlSteps.forEach(function (st) { st.classList.toggle('is-on', st.getBoundingClientRect().top < vh * 0.62); });
    }
    if (wordEls.length && !reduce) {
      var wr = words.getBoundingClientRect();
      var wp = clamp((vh * 0.85 - wr.top) / (wr.height + vh * 0.35), 0, 1);
      var on = Math.round(wp * wordEls.length);
      wordEls.forEach(function (x, i) { x.classList.toggle('on', i < on); });
    }
    if (hero && !reduce) {
      var sy = w.scrollY;
      heroOn = sy < vh * 1.2;
      if (heroOn) cards.forEach(function (c) {
        c.el.style.setProperty('--tx', (cx * c.depth * 26).toFixed(2) + 'px');
        c.el.style.setProperty('--ty', (cy * c.depth * 18 - sy * c.depth * 0.22).toFixed(2) + 'px');
      });
    }
  }
  function requestFrame() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  w.addEventListener('scroll', requestFrame, { passive: true });
  w.addEventListener('resize', requestFrame);
  requestFrame();

  if (hero && fine && !reduce) {
    var lerping = false;
    var lerp = function () {
      cx += (mx - cx) * 0.08; cy += (my - cy) * 0.08;
      frame();
      if (Math.abs(mx - cx) > 0.001 || Math.abs(my - cy) > 0.001) requestAnimationFrame(lerp); else lerping = false;
    };
    hero.addEventListener('pointermove', function (e) {
      mx = (e.clientX / w.innerWidth - 0.5) * 2; my = (e.clientY / w.innerHeight - 0.5) * 2;
      if (dot) { dot.style.setProperty('--dx', (mx * 10).toFixed(1) + 'px'); dot.style.setProperty('--dy', (my * 6).toFixed(1) + 'px'); }
      if (!lerping) { lerping = true; requestAnimationFrame(lerp); }
    });
    hero.addEventListener('pointerleave', function () { mx = 0; my = 0; if (dot) { dot.style.setProperty('--dx', '0px'); dot.style.setProperty('--dy', '0px'); } if (!lerping) { lerping = true; requestAnimationFrame(lerp); } });
  }

  /* ---------- Servicios: vista previa que sigue al mouse / activa en el celular ---------- */
  var svx = d.querySelector('[data-svx]');
  var flt = d.querySelector('[data-svx-float]');
  if (svx && flt && fine && !reduce) {
    var fimg = flt.querySelector('img');
    var fx = 0, fy = 0, tx = 0, ty = 0, fOn = false, fLoop = false;
    var fstep = function () {
      fx += (tx - fx) * 0.14; fy += (ty - fy) * 0.14;
      flt.style.setProperty('--fx', fx.toFixed(1) + 'px'); flt.style.setProperty('--fy', fy.toFixed(1) + 'px');
      flt.style.setProperty('--fr', clamp((tx - fx) * 0.04, -6, 6).toFixed(2) + 'deg');
      if (fOn || Math.abs(tx - fx) > 0.5) requestAnimationFrame(fstep); else fLoop = false;
    };
    svx.querySelectorAll('a[data-preview]').forEach(function (a) {
      a.addEventListener('pointerenter', function (e) {
        fimg.src = a.getAttribute('data-preview');
        flt.classList.toggle('is-wide', a.getAttribute('data-wide') === '1');
        if (!fOn) { fx = tx = e.clientX + 90; fy = ty = e.clientY - 140; }
        fOn = true; flt.classList.add('is-on');
        if (!fLoop) { fLoop = true; requestAnimationFrame(fstep); }
      });
      a.addEventListener('pointermove', function (e) { tx = Math.min(e.clientX + 90, w.innerWidth - flt.offsetWidth - 24); ty = e.clientY - (flt.offsetHeight / 2); });
    });
    svx.addEventListener('pointerleave', function () { fOn = false; flt.classList.remove('is-on'); });
  } else if (svx && 'IntersectionObserver' in w) {
    var rows = [].slice.call(svx.querySelectorAll('.svx-row'));
    var sio = new IntersectionObserver(function (en) {
      en.forEach(function (e) { e.target.classList.toggle('is-active', e.isIntersecting); });
    }, { rootMargin: '-42% 0px -42% 0px' });
    rows.forEach(function (r) { sio.observe(r); });
  }

  /* ---------- Cursor "Abrir" sobre los proyectos ---------- */
  if (fine && !reduce && d.querySelector('[data-cursor]')) {
    var cur = d.createElement('div');
    cur.className = 'cur'; cur.setAttribute('aria-hidden', 'true');
    d.body.appendChild(cur);
    d.addEventListener('pointermove', function (e) {
      cur.style.setProperty('--cx', e.clientX + 'px'); cur.style.setProperty('--cy', e.clientY + 'px');
      var t = e.target.closest && e.target.closest('[data-cursor]');
      if (t) { cur.textContent = t.getAttribute('data-cursor'); cur.style.setProperty('--cs', '1'); }
      else cur.style.setProperty('--cs', '0');
    }, { passive: true });
  }

  /* ---------- Botones magnéticos ---------- */
  if (fine && !reduce) {
    d.querySelectorAll('.magnetic').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + 'px');
        b.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) * 0.32).toFixed(1) + 'px');
      });
      b.addEventListener('pointerleave', function () { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
    });
  }

  /* ---------- Carril de "Más trabajos" ---------- */
  var rail = d.querySelector('[data-rail]');
  if (rail) {
    var prev = d.querySelector('[data-rail-prev]'), next = d.querySelector('[data-rail-next]');
    var by = function (dir) { var c = rail.querySelector('li'); rail.scrollBy({ left: dir * (c ? c.offsetWidth + 24 : 400), behavior: reduce ? 'auto' : 'smooth' }); };
    var upd = function () { if (!prev) return; prev.disabled = rail.scrollLeft < 8; next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8; };
    if (prev) prev.addEventListener('click', function () { by(-1); });
    if (next) next.addEventListener('click', function () { by(1); });
    rail.addEventListener('scroll', upd, { passive: true }); upd();
  }

  /* ---------- Filtros del portafolio ---------- */
  var filterWrap = d.querySelector('[data-filters]');
  if (filterWrap) {
    var chips = [].slice.call(filterWrap.querySelectorAll('[data-filter]'));
    var cards = [].slice.call(d.querySelectorAll('[data-grid] .work-card'));
    var empty = d.querySelector('[data-empty]');
    var status = d.querySelector('[data-filter-status]');
    var labels = {};
    chips.forEach(function (c) { labels[c.dataset.filter] = c.childNodes[0].textContent.trim(); });
    var emptyCopy = {
      apps: ['Las apps móviles son nuestra siguiente línea.', 'Estamos preparando las primeras. Si ya tienes la idea de una app para tu negocio, cuéntanosla y la planificamos contigo.'],
    };

    // Igual que en el build: nunca dejar una tarjeta sola en una fila
    function isBig(i, n) { return n % 2 === 1 ? i === 0 : n >= 4 ? (i === 0 || i === n - 1) : false; }
    function apply(key, push) {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === key)); });
      var match = cards.filter(function (card) { return key === 'all' || card.dataset.cats.split(' ').indexOf(key) > -1; });
      var shown = match.length;
      cards.forEach(function (card) { card.hidden = match.indexOf(card) === -1; card.classList.remove('is-big'); });
      match.forEach(function (card, i) { card.classList.toggle('is-big', isBig(i, shown)); });
      if (empty) {
        empty.hidden = shown > 0;
        var copy = emptyCopy[key];
        empty.querySelector('[data-empty-t]').textContent = copy ? copy[0] : 'Todavía no hay proyectos publicados en esta categoría.';
        empty.querySelector('[data-empty-d]').textContent = copy ? copy[1] : 'Si tu proyecto va por aquí, podemos empezar por el tuyo.';
      }
      if (status) status.textContent = shown + (shown === 1 ? ' proyecto' : ' proyectos') + (key === 'all' ? '' : ' en ' + labels[key]);
      if (push) { try { history.replaceState(null, '', key === 'all' ? location.pathname : '#' + key); } catch (e) {} }
    }
    function run(key) {
      if (d.startViewTransition && !reduce) d.startViewTransition(function () { apply(key, true); });
      else apply(key, true);
    }
    filterWrap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]');
      if (b) run(b.dataset.filter);
    });
    var initial = (location.hash || '').slice(1);
    if (initial && labels[initial]) apply(initial, false);
  }

  /* ---------- Copiar al portapapeles ---------- */
  d.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (!b) return;
    var text = b.getAttribute('data-copy'), label = b.querySelector('span');
    function done(ok) {
      if (!label) return;
      var prev = label.textContent;
      label.textContent = ok ? 'Copiado' : 'Selecciónalo';
      setTimeout(function () { label.textContent = prev; }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { selectSibling(b); done(false); });
    } else { selectSibling(b); done(false); }
  });
  function selectSibling(b) {
    var src = b.parentNode.querySelector('[data-copy-src]') || b.previousElementSibling;
    if (!src) return;
    var r = d.createRange(); r.selectNodeContents(src);
    var sel = w.getSelection(); sel.removeAllRanges(); sel.addRange(r);
  }

  /* ---------- Negocios: apariciones y demostración del panel ---------- */
  var ins = [].slice.call(d.querySelectorAll('[data-in]'));
  if (ins.length) {
    if ('IntersectionObserver' in w && !reduce) {
      var inIO = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); inIO.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -10% 0px' });
      ins.forEach(function (el) { inIO.observe(el); });
    } else ins.forEach(function (el) { el.classList.add('in'); });
  }

  // Lo que se cambia en el panel (izquierda) aparece en lo que ve el cliente (derecha)
  [].slice.call(d.querySelectorAll('[data-live]')).forEach(function (live) {
    var cfg;
    try { cfg = JSON.parse(live.getAttribute('data-live')); } catch (e) { return; }
    var rows = live.querySelectorAll('.lv-row'), cards = live.querySelectorAll('.lv-card');
    var caps = [].slice.call(live.querySelectorAll('.live-steps li'));
    var addBtn = live.querySelector('.lv-addbtn'), toast = live.querySelector('[data-toast]');
    var DUR = 3600, timers = [], running = false, idx = -1;
    caps.forEach(function (c) { c.style.setProperty('--dur', DUR + 'ms'); });
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function redo(el, c) { el.classList.remove(c); void el.offsetWidth; el.classList.add(c); }
    function price(el, v) { var t = el.querySelector('[data-p]'); t.textContent = v; redo(t, 'is-chg'); }
    function saved() { toast.classList.add('is-on'); later(function () { toast.classList.remove('is-on'); }, 1100); }
    function reset() {
      [].forEach.call(rows, function (r, i) { r.classList.remove('is-off', 'is-in', 'is-tap'); r.classList.toggle('is-hidden', i === cfg.add); r.querySelector('[data-p]').textContent = cfg.orig[i]; });
      [].forEach.call(cards, function (c, i) { c.classList.remove('is-off', 'is-in', 'is-new', 'is-flash'); c.classList.toggle('is-hidden', i === cfg.add); c.querySelector('[data-p]').textContent = cfg.orig[i]; });
      caps.forEach(function (c) { c.classList.remove('is-on', 'is-done'); });
    }
    function apply(s, instant) {
      var i = s.a === 'add' ? cfg.add : s.i;
      var row = rows[i], card = cards[i];
      var toRow = function () {
        if (s.a === 'price') price(row, s.to);
        else if (s.a === 'off') row.classList.add('is-off');
        else { row.classList.remove('is-hidden'); redo(row, 'is-in'); }
      };
      var toCard = function () {
        if (s.a === 'price') price(card, s.to);
        else if (s.a === 'off') card.classList.add('is-off');
        else { card.classList.remove('is-hidden'); card.classList.add('is-new'); redo(card, 'is-in'); }
        redo(card, 'is-flash');
      };
      if (instant) { toRow(); toCard(); return; }
      redo(s.a === 'add' ? addBtn : row, 'is-tap');
      later(function () { toRow(); saved(); }, 550);
      later(function () { redo(live, 'is-sync'); }, 900);
      later(toCard, 1450);
    }
    function loop() {
      idx++;
      if (idx >= cfg.steps.length) { later(function () { reset(); idx = -1; later(loop, 700); }, 1200); return; }
      caps.forEach(function (c, j) { c.classList.toggle('is-on', j === idx); c.classList.toggle('is-done', j < idx); });
      apply(cfg.steps[idx]);
      later(loop, DUR);
    }
    function start() { if (running) return; running = true; reset(); idx = -1; later(loop, 400); }
    function stop() { running = false; timers.forEach(clearTimeout); timers = []; }
    if (reduce || !('IntersectionObserver' in w)) {
      cfg.steps.forEach(function (s) { apply(s, true); });
      caps.forEach(function (c) { c.classList.add('is-done'); });
      return;
    }
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) start(); else stop(); }); }, { threshold: 0.3 }).observe(live);
  });

  /* ---------- "Tu negocio. En línea.": cada negocio en video, uno tras otro ---------- */
  // La sección scrollea normal. Cada negocio muestra su video (animación de inicio,
  // página principal y recorrido completo) y al terminar pasa al siguiente.
  // Fluidez: el siguiente video se carga antes de tiempo, el cambio solo usa opacidad y
  // movimiento (lo barato para el celular) y el video arranca cuando la transición terminó.
  var car = d.querySelector('[data-carousel]');
  if (car) {
    var cs = { el: car, step: null };
    var scenesEl = car.querySelectorAll('.dev-scene');
    var devEl = car.querySelector('[data-dev]');
    var total = scenesEl.length, playTimer = null, startTimer = null, visible = false, token = 0;
    var vidOf = function (i) { return scenesEl[(i + total) % total] && scenesEl[(i + total) % total].querySelector('video'); };
    var warm = function (v) {
      if (!v) return;
      if (v.preload !== 'auto') v.preload = 'auto';
      if (v.readyState === 0 && v.networkState !== 2) v.load();
    };
    var ready = function (v, cb) {
      if (!v || v.readyState >= 2) return cb();
      warm(v);
      var done = false, fin = function () { if (done) return; done = true; v.removeEventListener('loadeddata', fin); cb(); };
      v.addEventListener('loadeddata', fin);
      setTimeout(fin, 2500);
    };
    var setBar = function (ms) {
      car.style.setProperty('--dur', ms + 'ms');
      car.classList.remove('is-play'); void car.offsetWidth; car.classList.add('is-play');
    };
    var next = function () { go(cs.step + 1); };
    var stopAll = function () { clearTimeout(playTimer); clearTimeout(startTimer); };
    var run = function (fresh, delay) {
      stopAll();
      var v = vidOf(cs.step);
      [].forEach.call(car.querySelectorAll('video'), function (o) { if (o !== v && !o.paused) o.pause(); });
      if (!visible || reduce || d.hidden) { if (v) v.pause(); car.classList.remove('is-play'); return; }
      if (!v) { setBar(4200); playTimer = setTimeout(next, 4200); warm(vidOf(cs.step + 1)); return; }
      if (fresh) { try { v.pause(); v.currentTime = 0; } catch (e) {} }
      startTimer = setTimeout(function () {
        var p = v.play();
        var armed = function () {
          var left = (isFinite(v.duration) && v.duration ? (v.duration - v.currentTime) : 16) * 1000;
          setBar(left);
          playTimer = setTimeout(next, left + 2000); // respaldo por si el video no avisa que terminó
          warm(vidOf(cs.step + 1));
        };
        if (p && p.then) p.then(armed, function () { setBar(5000); playTimer = setTimeout(next, 5000); });
        else armed();
      }, delay || 0);
    };
    var go = function (i) {
      i = (i + total) % total;
      if (i === cs.step) { run(true, 0); return; }
      var my = ++token;
      stopAll();
      ready(vidOf(i), function () {
        if (my !== token) return;
        var wasShape = devEl && devEl.getAttribute('data-shape');
        setInst(cs, i); cs.step = i;
        var morph = devEl && devEl.getAttribute('data-shape') !== wasShape;
        run(true, morph ? 950 : 650);
      });
    };
    [].forEach.call(car.querySelectorAll('video'), function (v) {
      v.addEventListener('ended', function () { if (scenesEl[cs.step] && scenesEl[cs.step].contains(v)) next(); });
    });
    setInst(cs, 0); cs.step = 0;
    car.querySelectorAll('.inst-list li, .inst-dots button').forEach(function (b) {
      var pick = function () { go(+b.getAttribute('data-i')); };
      b.addEventListener('click', pick);
      if (b.tagName === 'LI') b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    });
    var sx = null, sy = null;
    if (devEl) {
      devEl.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
      devEl.addEventListener('touchend', function (e) {
        if (sx === null) return;
        var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) go(cs.step + (dx < 0 ? 1 : -1));
        sx = null;
      }, { passive: true });
    }
    if ('IntersectionObserver' in w) {
      // antes de llegar a la sección ya se empieza a cargar el primer video
      new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !reduce) warm(vidOf(cs.step)); }); }, { rootMargin: '900px 0px' }).observe(car);
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { var was = visible; visible = e.isIntersecting; if (visible !== was) run(false, 0); });
      }, { threshold: 0.35 }).observe(car);
    }
    d.addEventListener('visibilitychange', function () { run(false, 0); });
  }
})();
