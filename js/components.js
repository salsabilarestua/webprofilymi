/* ==========================================================================
   components.js — Komponen bersama (Top bar, Header, Footer)
   Dirender ke elemen:  <div id="app-header"></div>  dan  <div id="app-footer"></div>
   Path otomatis menyesuaikan lewat <body data-base="" | "../" data-page="...">
   ========================================================================== */
(function () {
  'use strict';

  var body = document.body;
  var base = body.dataset.base || '';          // '' untuk index.html, '../' untuk folder /pages
  var page = body.dataset.page || '';          // beranda | tentang | program | kegiatan | prestasi | donasi
  var showAlert = body.dataset.alert === 'true'; // strip peringatan (halaman donasi)

  /* ---------- Ikon SVG inline (gaya outline, stroke = currentColor) ---------- */
  var I = {
    shieldCheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3z"/><path d="M12 9v4M12 17h.01"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2C1 8.1 1 12 1 12s0 3.9.5 5.6a2.8 2.8 0 0 0 2 2C5.2 20 12 20 12 20s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2C23 15.9 23 12 23 12s0-3.9-.5-5.6zM9.8 15.5v-7l5.9 3.5-5.9 3.5z"/></svg>',
    cap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.7-2.5 1.8 0 2.5 5 1.2 5 3.7 0 1.1-1.1 1.8-2.5 1.8-1.1 0-2-.4-2.5-1.2M12 6.5V8m0 8v1.5"/></svg>'
  };

  var MENU = [
    { key: 'beranda',  label: 'Beranda',      href: base + 'index.html' },
    { key: 'tentang',  label: 'Tentang Kami', href: base + 'pages/tentang.html' },
    { key: 'program',  label: 'Program',      href: base + 'index.html#program' },
    { key: 'kegiatan', label: 'Kegiatan',     href: base + 'pages/kegiatan.html' },
    { key: 'prestasi', label: 'Prestasi',     href: base + 'pages/prestasi.html' },
    { key: 'donasi',   label: 'Donasi',       href: base + 'pages/donasi.html' }
  ];

  function links(cls) {
    return MENU.map(function (m) {
      var active = m.key === page ? ' is-active' : '';
      return '<a href="' + m.href + '" class="' + (cls || '') + active + '"' +
             (active ? ' aria-current="page"' : '') + '>' + m.label + '</a>';
    }).join('');
  }

  /* ---------- Top bar + Header ---------- */
  var header =
    '<div class="topbar">' +
      '<div class="topbar__inner">' +
        '<div class="topbar__row topbar__row--left">' +
          /* DUMMY: nomor SK Kemenkumham & status akreditasi — ganti dengan data resmi yayasan */
          '<span class="topbar__item">' + I.shieldCheck +
            '<span class="topbar__legal-full">Legalitas: SK Kemenkumham RI No. AHU-0019284.AH.01.04.Tahun 2018</span>' +
            '<span class="topbar__legal-short">SK AHU-0019284.AH.01.04.Tahun 2018</span></span>' +
          '<span class="topbar__sep" aria-hidden="true"></span>' +
          '<span class="topbar__item topbar__badge">' + I.shield.replace('<svg', '<svg class="only-lg-icon"') +
            '<span class="topbar__badge-full">Amanah &amp; Terakreditasi Nasional</span>' +
            '<span class="topbar__badge-short">Amanah &amp; Terakreditasi</span></span>' +
        '</div>' +
        '<div class="topbar__row topbar__row--right">' +
          /* DUMMY: nomor WhatsApp resmi anti-penipuan rekening — ganti nomor asli */
          '<span class="topbar__item topbar__warn">' + I.warn +
            '<span><span class="topbar__legal-full">Layanan </span>Anti-Penipuan Rekening: ' +
            '<b class="mobile-bold">0000-0000-0000</b> ' +
            '<a href="https://wa.me/620000000000" target="_blank" rel="noopener"><u>(WA Resmi)</u></a></span></span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<header class="site-header">' +
      '<div class="site-header__inner">' +
        '<a class="brand" href="' + base + 'index.html" aria-label="Yayasan Mutiara Ilmu — Beranda">' +
          /* DUMMY: logo — gambar/logo.png hasil potongan dari desain, ganti dengan file logo resmi (SVG/PNG) */
          '<img src="' + base + 'gambar/logo.png" alt="Logo Yayasan Mutiara Ilmu" width="44" height="44">' +
          '<span class="brand__text"><span>Yayasan</span> Mutiara Ilmu</span>' +
        '</a>' +
        '<nav class="nav-desktop" aria-label="Navigasi utama">' + links() + '</nav>' +
        '<div class="nav-actions">' +
          '<a class="btn-donasi-m" href="' + base + 'pages/donasi.html">' + I.coin + 'Donasi</a>' +
          '<button class="btn-burger" id="btn-burger" type="button" aria-label="Buka menu" aria-expanded="false" aria-controls="nav-mobile">' + I.menu + '</button>' +
        '</div>' +
      '</div>' +
      '<nav class="nav-mobile" id="nav-mobile" aria-label="Navigasi seluler">' + links() + '</nav>' +
    '</header>' +
    (showAlert
      ? '<div class="alert-strip" role="note"><div class="alert-strip__inner">' + I.shield +
        '<p style="margin:0"><b>Perhatian penting:</b> <span>Kami tidak pernah menggunakan rekening pribadi lainnya. Pastikan donasi Anda hanya disalurkan ke rekening resmi atas nama Yayasan Mutiara Ilmu atau ketua yayasan. Lakukan konfirmasi melalui akun resmi kami.</span></p></div></div>'
      : '');

  /* ---------- Footer ---------- */
  var footer =
    '<footer class="site-footer">' +
      '<div class="footer__inner">' +
        '<div class="footer__col footer__col--brand" style="border:0;padding-top:0">' +
          '<div class="footer__brand"><span class="ico"><span class="only-mobile">' + I.cap + '</span><span class="only-desktop">' + I.note + '</span></span> ' +
            '<span>Yayasan Mutiara Ilmu</span></div>' +
          /* DUMMY: deskripsi singkat & wilayah layanan */
          '<p class="footer__about">Mewujudkan generasi Qurani yang berkarakter islami, unggul akademis, dan berjiwa mandiri. Berkhidmat di wilayah Jawa Tengah &amp; Jawa Timur.</p>' +
          /* DUMMY: nomor legalitas Kemenkumham */
          '<div class="footer__legal"><b>Legalitas Resmi Kemenkumham RI:</b>No. AHU-0019284.AH.01.04.Tahun 2018</div>' +
        '</div>' +
        '<div class="footer__col">' +
          '<h4 class="footer__h">Kantor Sekretariat</h4>' +
          '<ul class="footer__list">' +
            /* DUMMY: alamat lengkap kantor sekretariat */
            '<li>Jl. Cipongporang</li>' +
            /* DUMMY: tautan Google Maps */
            '<li><a class="hl footer__link-hl" href="https://maps.google.com" target="_blank" rel="noopener">' + I.pin + 'Petunjuk Lokasi (Google Maps)</a></li>' +
            /* DUMMY: nomor WhatsApp resmi */
            '<li><a class="hl footer__link-hl" href="https://wa.me/6281234567890" target="_blank" rel="noopener">' +
              '<span class="only-mobile">' + I.phone + '</span><span class="only-desktop">' + I.chat + '</span>' +
              '<span><span class="hide-lg">WhatsApp Resmi: 0812-3456-7890</span><span class="show-lg">WhatsApp Resmi: 0812-3456-7890</span></span></a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer__col">' +
          '<h4 class="footer__h">Program Pendidikan</h4>' +
          '<ul class="footer__list">' +
            '<li><a href="' + base + 'pages/ra.html">RA (Raudatul Athfal) Mutiara Ilmu</a></li>' +
            '<li><a href="' + base + 'pages/dta.html">DTA (Diniyah Takmiliyah Awaliyah)</a></li>' +
            '<li><a href="' + base + 'pages/majelis.html">Majelis Ta\'lim &amp; Kajian Rutin</a></li>' +
            /* DUMMY: halaman Rumah Singgah belum tersedia */
            '<li><a href="#"><span class="hide-lg">Rumah Singgah &amp; Tahfiz</span><span class="show-lg">Rumah Singgah</span></a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer__col">' +
          '<h4 class="footer__h">Media &amp; Akuntabilitas</h4>' +
          '<p class="footer__about" style="margin-top:0">Ikuti dokumentasi harian santri, kajian video, dan laporan keterbukaan donasi di media sosial kami:</p>' +
          '<div class="footer__social">' +
            /* DUMMY: tautan media sosial */
            '<a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">' + I.instagram + '</a>' +
            '<a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube">' + I.youtube + '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="footer__bottom">' +
        '<span>&copy; 2026 Yayasan Mutiara Ilmu. Hak Cipta Dilindungi Undang-Undang Republik Indonesia.</span>' +
        /* DUMMY: tautan kebijakan, laporan transparansi, dan SOP belum tersedia */
        '<nav aria-label="Tautan hukum"><a href="#">Kebijakan Privasi</a><a href="#">Laporan Transparansi</a><a href="#">SOP Lembaga</a></nav>' +
      '</div>' +
    '</footer>';

  var h = document.getElementById('app-header');
  var f = document.getElementById('app-footer');
  if (h) h.innerHTML = header;
  if (f) f.innerHTML = footer;

  // expose icons untuk dipakai halaman lain bila perlu
  window.YMI_ICONS = I;
})();
