/* ==========================================================================
   main.js — Interaksi ringan (halaman tetap statis)
   1. Menu mobile  2. Filter kategori  3. Animasi muncul saat scroll
   ========================================================================== */
(function () {
  'use strict';

  /* 1. Menu mobile ------------------------------------------------------- */
  // Dijalankan setelah components.js merender header
  var burger = document.getElementById('btn-burger');
  var navMobile = document.getElementById('nav-mobile');
  if (burger && navMobile) {
    var burgerIcons = window.YMI_ICONS || {};
    burger.addEventListener('click', function () {
      var open = navMobile.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
      if (burgerIcons.menu && burgerIcons.close) burger.innerHTML = open ? burgerIcons.close : burgerIcons.menu;
    });
    navMobile.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') navMobile.classList.remove('is-open');
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) navMobile.classList.remove('is-open');
    });
  }

  /* 2. Filter kategori (halaman Kegiatan & Prestasi) --------------------- */
  var tabs = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('[data-kategori]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var f = tab.getAttribute('data-filter');
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-pressed', String(on));
      });
      cards.forEach(function (c) {
        c.hidden = !(f === 'semua' || c.getAttribute('data-kategori') === f);
      });
    });
  });

  /* 3. Animasi muncul saat scroll --------------------------------------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
