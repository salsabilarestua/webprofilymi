/**
 * Yayasan Mutiara Ilmu - Main JavaScript
 * Handles Navigation, Mobile Drawer, WA Generator, Gallery Filter, Lightbox, & Local Content Sync
 */

// Default Foundation Contact Configuration
const YAYASAN_CONFIG = {
  name: "YPI Mutiara Ilmu Papakserang",
  fullName: "Yayasan Pendidikan Islam Mutiara Ilmu Papakserang (Tarbiyatul Qur'an)",
  phoneWhatsApp: "6281234567890", // Ganti dengan nomor WhatsApp resmi Ketua Yayasan
  email: "info@mutiarailmu.or.id",
  address: "Papakserang, Cibiru, Kota Bandung, Jawa Barat",
  bankAccounts: [
    { bank: "Bank Syariah Indonesia (BSI)", number: "7123456789", holder: "YAYASAN MUTIARA ILMU" },
    { bank: "Bank Mandiri", number: "1310012345678", holder: "YAYASAN MUTIARA ILMU" }
  ]
};

// Default Mock Data for Stories, News, and Gallery (Can be updated via Admin Panel)
const DEFAULT_STORIES = [
  {
    id: 1,
    title: "Kisah Santri Cilik DTA Hafal Juz 30 dalam 6 Bulan",
    category: "DTA",
    date: "18 Oktober 2026",
    summary: "Muhammad Faris (9 tahun) menunjukkan ketekunan luar biasa dalam program tahsin & tahfidz intensif sore hari di DTA Mutiara Ilmu.",
    image: "assets/images/dta-kbm.jpg",
    ratio: "4:3",
    author: "Ustadz Ridwan, S.Pd.I"
  },
  {
    id: 2,
    title: "Pentas Seni & Kreativitas Islami Santri RA Mutiara Ilmu",
    category: "RA",
    date: "12 Oktober 2026",
    summary: "Anak-anak didik Raudhatul Athfal menampilkan hafalan hadits pendek, doa harian, dan nasyid ceria di hadapan para orang tua.",
    image: "assets/images/ra-kegiatan.jpg",
    ratio: "4:3",
    author: "Ustadzah Aisyah, S.Pd"
  },
  {
    id: 3,
    title: "Kajian Bulanan Majelis Ta'lim: Meneladani Akhlak Rasulullah",
    category: "Majelis Ta'lim",
    date: "05 Oktober 2026",
    summary: "Diikuti jamaah warga Papakserang dan sekitarnya, membahas pentingnya membangun sakinah dalam keluarga islami modern.",
    image: "assets/images/majlis-talim.jpg",
    ratio: "4:3",
    author: "H. Ahmad Fauzi"
  }
];

const DEFAULT_GALLERY = [
  {
    id: 1,
    title: "Kegiatan Belajar & Kreativitas Santri RA",
    category: "RA",
    image: "assets/images/ra-kegiatan.jpg",
    ratio: "4:3"
  },
  {
    id: 2,
    title: "Praktik Ibadah & Shalat Santri",
    category: "RA",
    image: "assets/images/ra-shalat.jpg",
    ratio: "4:3"
  },
  {
    id: 3,
    title: "Kajian Rutin Majelis Ta'lim Warga",
    category: "Majelis Ta'lim",
    image: "assets/images/majlis-talim.jpg",
    ratio: "4:3"
  },
  {
    id: 4,
    title: "Peragaan Manasik Haji Santri Cilik RA",
    category: "RA",
    image: "assets/images/ra-manasik.jpg",
    ratio: "4:3"
  },
  {
    id: 5,
    title: "Acara Khidmat Khatam Al-Qur'an Santri DTA",
    category: "DTA",
    image: "assets/images/hero-khataman.jpg",
    ratio: "4:3"
  },
  {
    id: 6,
    title: "Penyaluran Santunan Anak Yatim & Dhuafa",
    category: "Majelis Ta'lim",
    image: "assets/images/santunan-yatim.jpg",
    ratio: "4:3"
  },
  {
    id: 7,
    title: "Seni Terbangan & Musik Islami DTA",
    category: "DTA",
    image: "assets/images/dta-terbangan.jpg",
    ratio: "4:3"
  },
  {
    id: 8,
    title: "Pesantren Kilat (Paskil) Ramadhan",
    category: "DTA",
    image: "assets/images/paskil-ramadhan.jpg",
    ratio: "4:3"
  }
];

// Document Ready
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initWhatsAppDirect();
  initGalleryFilter();
  initLightbox();
  initCopyAccount();
  syncDynamicData();
  initSecretAdminAccess();
});

// 1. Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("mobile-menu-close");

  if (!menuBtn || !mobileMenu) return;

  const toggle = (show) => {
    if (show) {
      mobileMenu.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    } else {
      mobileMenu.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };

  menuBtn.addEventListener("click", () => toggle(true));
  if (closeBtn) closeBtn.addEventListener("click", () => toggle(false));

  // Close when clicking link
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => toggle(false));
  });
}

// 2. WhatsApp Direct Link Helper (Skenario 3)
function initWhatsAppDirect() {
  const donationButtons = document.querySelectorAll(".btn-direct-wa-donasi");
  const registerButtons = document.querySelectorAll(".btn-direct-wa-daftar");

  donationButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const amount = btn.dataset.amount || "";
      const program = btn.dataset.program || "Donasi Umum / Infaq Santri";
      const message = encodeURIComponent(
        `Assalamu'alaikum Warahmatullahi Wabarakatuh, Pengurus Yayasan Mutiara Ilmu.\n\n` +
        `Saya ingin melakukan konfirmasi donasi untuk program: *${program}*.\n` +
        (amount ? `Nominal: *${amount}*\n\n` : `\n`) +
        `Mohon informasi nomor rekening dan konfirmasi penerimaan. Terima kasih.`
      );
      window.open(`https://wa.me/${YAYASAN_CONFIG.phoneWhatsApp}?text=${message}`, "_blank");
    });
  });

  registerButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const unit = btn.dataset.unit || "Santri Baru";
      const message = encodeURIComponent(
        `Assalamu'alaikum Warahmatullahi Wabarakatuh, Admin Yayasan Mutiara Ilmu.\n\n` +
        `Saya ingin menanyakan informasi pendaftaran dan biaya pendidikan untuk unit *${unit}* di Yayasan Mutiara Ilmu.\n\n` +
        `Mohon petunjuk syarat dan alur pendaftarannya. Terima kasih.`
      );
      window.open(`https://wa.me/${YAYASAN_CONFIG.phoneWhatsApp}?text=${message}`, "_blank");
    });
  });
}

// 3. Interactive Gallery Filter (Skenario 2)
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-card-item");

  if (!filterButtons.length || !galleryItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active button style
      filterButtons.forEach(b => {
        b.classList.remove("bg-[#0B4D3C]", "text-white", "shadow-md");
        b.classList.add("bg-white", "text-[#0B4D3C]", "border", "border-emerald-200");
      });
      btn.classList.add("bg-[#0B4D3C]", "text-white", "shadow-md");
      btn.classList.remove("bg-white", "text-[#0B4D3C]", "border", "border-emerald-200");

      const category = btn.dataset.filter;

      galleryItems.forEach(item => {
        const itemCat = item.dataset.category;
        if (category === "all" || itemCat === category) {
          item.style.display = "block";
          item.classList.add("animate-fade-in");
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// 4. Modal Lightbox for Images
function initLightbox() {
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxClose = document.getElementById("lightbox-close");

  if (!lightbox) return;

  document.querySelectorAll(".open-lightbox").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const src = trigger.dataset.src || trigger.getAttribute("src");
      const title = trigger.dataset.title || "Dokumentasi Yayasan Mutiara Ilmu";
      
      if (lightboxImg) lightboxImg.src = src;
      if (lightboxTitle) lightboxTitle.textContent = title;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

// 5. Copy Bank Account to Clipboard
function initCopyAccount() {
  const copyButtons = document.querySelectorAll(".btn-copy-account");
  copyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.dataset.number;
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span class="text-xs">✓ Tersalin!</span>`;
        btn.classList.add("bg-emerald-700", "text-white");
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove("bg-emerald-700", "text-white");
        }, 2000);
      });
    });
  });
}

// 6. Sync Dynamic Content from LocalStorage (Local CMS Persistence)
function syncDynamicData() {
  // 1. Sync Settings (WhatsApp & Bank)
  const savedWA = localStorage.getItem("mutiara_setting_wa");
  if (savedWA) YAYASAN_CONFIG.phoneWhatsApp = savedWA;

  const savedBSI = localStorage.getItem("mutiara_setting_bsi");
  if (savedBSI && YAYASAN_CONFIG.bankAccounts[0]) {
    YAYASAN_CONFIG.bankAccounts[0].number = savedBSI;
  }

  // 2. Stories Sync
  let stories = JSON.parse(localStorage.getItem("mutiara_stories") || "null");
  if (!stories || stories.length === 0) {
    stories = DEFAULT_STORIES;
    localStorage.setItem("mutiara_stories", JSON.stringify(DEFAULT_STORIES));
  }

  const storiesContainer = document.getElementById("home-stories-container");
  if (storiesContainer && stories.length > 0) {
    const top3 = stories.slice(0, 3);
    storiesContainer.innerHTML = top3.map(item => `
      <article class="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm card-hover flex flex-col justify-between">
        <div>
          <div class="relative w-full ratio-4-3 bg-slate-100 overflow-hidden">
            <img 
              src="${item.image.startsWith('../') ? item.image.replace('../', '') : item.image}" 
              alt="${item.title}"
              class="object-fit-safe transition duration-500 hover:scale-105"
            >
            <span class="absolute top-3 left-3 bg-[#0B4D3C] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              Unit ${item.category}
            </span>
            <div class="watermark-badge text-[10px] py-0.5 px-2">
              <span>Dokumentasi ${item.category}</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
              <span>${item.date}</span>
            </div>
            <h3 class="text-base font-bold text-[#0B4D3C] hover:text-emerald-700 transition leading-snug mb-2">
              <a href="kegiatan.html">${item.title}</a>
            </h3>
            <p class="text-slate-600 text-xs leading-relaxed line-clamp-3">
              ${item.summary}
            </p>
          </div>
        </div>
        <div class="px-6 pb-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
          <span class="text-[11px] font-semibold text-slate-500">Oleh: ${item.author || "Pengurus"}</span>
          <a href="kegiatan.html" class="text-xs font-bold text-[#F59E0B] hover:text-[#D97706] flex items-center gap-1">
            Baca &rarr;
          </a>
        </div>
      </article>
    `).join("");
    if (window.lucide) lucide.createIcons();
  }

  // 3. Gallery Sync
  let gallery = JSON.parse(localStorage.getItem("mutiara_gallery") || "null");
  if (!gallery || gallery.length === 0) {
    gallery = DEFAULT_GALLERY;
    localStorage.setItem("mutiara_gallery", JSON.stringify(DEFAULT_GALLERY));
  }

  const galleryContainer = document.getElementById("gallery-container");
  if (galleryContainer && gallery.length > 0) {
    galleryContainer.innerHTML = gallery.map(item => {
      const imgSrc = item.image.startsWith('../') ? item.image.replace('../', '') : item.image;
      const catColor = item.category === 'RA' ? 'bg-[#D97706]' : item.category === 'DTA' ? 'bg-[#0B4D3C]' : 'bg-emerald-800';
      return `
        <div class="gallery-card-item bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm card-hover flex flex-col justify-between" data-category="${item.category}">
          <div class="relative w-full ratio-4-3 bg-slate-100 overflow-hidden cursor-pointer open-lightbox" data-src="${imgSrc}" data-title="${item.title}">
            <img 
              src="${imgSrc}" 
              alt="${item.title}"
              class="object-fit-safe transition duration-500 hover:scale-105"
            >
            <span class="absolute top-3 left-3 ${catColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              Unit ${item.category}
            </span>
            <div class="watermark-badge">
              <i data-lucide="shield-check" class="w-3 h-3 text-[#0B4D3C]"></i>
              <span>Yayasan Mutiara Ilmu</span>
            </div>
          </div>
          <div class="p-5">
            <span class="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1.5">
              <i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${item.date || "Oktober 2026"}
            </span>
            <h3 class="font-bold text-slate-900 text-sm leading-snug">${item.title}</h3>
            <p class="text-xs text-slate-500 mt-2 line-clamp-2">${item.summary || "Dokumentasi kegiatan santri dan pembinaan keummatan Yayasan Mutiara Ilmu."}</p>
          </div>
        </div>
      `;
    }).join("");
    if (window.lucide) lucide.createIcons();
    initLightbox();
  }
}

// 7. Secret Admin Access (Hidden from public navigation for security)
function initSecretAdminAccess() {
  // Shortcut 1: Keyboard shortcut (Ctrl + Shift + A)
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
      e.preventDefault();
      window.location.href = "kelola-internal-mutiara/login.html";
    }
  });

  // Shortcut 2: Discreet Triple Click on Footer Copyright (accessible on mobile/touch devices)
  const copyrightEl = document.getElementById("footer-copyright");
  if (copyrightEl) {
    let clickCount = 0;
    let clickTimer = null;
    copyrightEl.addEventListener("click", () => {
      clickCount++;
      clearTimeout(clickTimer);
      if (clickCount >= 3) {
        clickCount = 0;
        window.location.href = "kelola-internal-mutiara/login.html";
      } else {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 1200);
      }
    });
  }
}
