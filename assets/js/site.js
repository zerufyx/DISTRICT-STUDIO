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

  /* ---------- Encabezado con fondo al bajar y barra fija en el celular ---------- */
  var dock = d.querySelector('[data-dock]');
  if ('IntersectionObserver' in w) {
    var sentinel = d.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:12px;pointer-events:none';
    d.body.prepend(sentinel);
    new IntersectionObserver(function (en) { if (head) head.classList.toggle('is-scrolled', !en[0].isIntersecting); }).observe(sentinel);

    if (dock) {
      var anchor = d.querySelector('.hero-actions') || d.querySelector('.page-hero');
      var ends = [].slice.call(d.querySelectorAll('.cta-band, .site-foot'));
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

  /* ---------- Aparición suave (solo lo que está fuera de pantalla al cargar) ---------- */
  if ('IntersectionObserver' in w && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    d.querySelectorAll('.sec-head, .work-card, .prop, .ba-grid, .svc-index li, .cap-list li, .steps li, .control-phones, .svc-block, .story-row, .benefit-cols, .principles li, .growth, .live-list li, .next-case').forEach(function (el) {
      if (el.getBoundingClientRect().top > w.innerHeight) { el.classList.add('reveal'); io.observe(el); }
    });
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
})();
