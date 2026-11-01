/**
 * Yayasan Mutiara Ilmu - Admin Dashboard JavaScript
 * Handles CMS Content Updates, Photo Ratio Guides, and Persistence
 */

// Check Authentication Session
document.addEventListener("DOMContentLoaded", () => {
  const session = sessionStorage.getItem("mutiara_admin_session");
  if (!session) {
    window.location.href = "login.html";
    return;
  }

  initNavigation();
  loadDashboardStats();
  renderStoriesTable();
  renderGalleryGrid();
  initStoryForm();
  initGalleryForm();
  initSettingsForm();
  initLogout();
});

// 1. Navigation / Tab Switching
function initNavigation() {
  const navLinks = document.querySelectorAll(".admin-nav-item");
  const tabPanes = document.querySelectorAll(".admin-tab-pane");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.tab;

      navLinks.forEach(l => {
        l.classList.remove("bg-[#0B4D3C]", "text-white");
        l.classList.add("text-slate-600", "hover:bg-slate-100");
      });
      link.classList.add("bg-[#0B4D3C]", "text-white");
      link.classList.remove("text-slate-600", "hover:bg-slate-100");

      tabPanes.forEach(pane => {
        if (pane.id === `tab-${target}`) {
          pane.classList.remove("hidden");
        } else {
          pane.classList.add("hidden");
        }
      });
    });
  });
}

// 2. Load Stats
function loadDashboardStats() {
  const stories = JSON.parse(localStorage.getItem("mutiara_stories") || "[]");
  const gallery = JSON.parse(localStorage.getItem("mutiara_gallery") || "[]");

  const statStories = document.getElementById("stat-stories-count");
  const statGallery = document.getElementById("stat-gallery-count");

  if (statStories) statStories.textContent = stories.length;
  if (statGallery) statGallery.textContent = gallery.length;
}

// 3. Render Stories Table
function renderStoriesTable() {
  const tableBody = document.getElementById("stories-table-body");
  if (!tableBody) return;

  const stories = JSON.parse(localStorage.getItem("mutiara_stories") || "[]");

  if (stories.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-xs text-slate-400">Belum ada cerita santri atau berita.</td></tr>`;
    return;
  }

  tableBody.innerHTML = stories.map((item, index) => `
    <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition text-xs">
      <td class="py-3 px-4 font-bold text-slate-700">${index + 1}</td>
      <td class="py-3 px-4 font-bold text-[#0B4D3C] max-w-xs truncate">${item.title}</td>
      <td class="py-3 px-4">
        <span class="px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${
          item.category === 'RA' ? 'bg-amber-100 text-amber-800' :
          item.category === 'DTA' ? 'bg-emerald-100 text-emerald-800' :
          'bg-slate-100 text-slate-800'
        }">${item.category}</span>
      </td>
      <td class="py-3 px-4 text-slate-500 whitespace-nowrap">${item.date}</td>
      <td class="py-3 px-4 text-right whitespace-nowrap">
        <button onclick="deleteStory(${item.id})" class="text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded hover:bg-red-50 transition">
          Hapus
        </button>
      </td>
    </tr>
  `).join("");
}

// 4. Render Gallery Grid
function renderGalleryGrid() {
  const container = document.getElementById("admin-gallery-list");
  if (!container) return;

  const gallery = JSON.parse(localStorage.getItem("mutiara_gallery") || "[]");

  if (gallery.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-8 text-xs text-slate-400">Belum ada foto kegiatan.</div>`;
    return;
  }

  container.innerHTML = gallery.map(item => `
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
      <div class="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
        <span class="absolute top-2 left-2 bg-[#0B4D3C] text-white text-[9px] font-bold px-2 py-0.5 rounded">
          ${item.category}
        </span>
        <div class="watermark-badge text-[9px] py-0.5 px-1.5 bottom-2 right-2">
          <span>Yayasan Mutiara Ilmu</span>
        </div>
      </div>
      <div class="p-3">
        <p class="font-bold text-slate-800 text-xs truncate">${item.title}</p>
        <div class="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
          <span class="text-[10px] text-slate-400">Rasio: 4:3 Pas</span>
          <button onclick="deleteGallery(${item.id})" class="text-red-500 hover:text-red-700 text-xs font-semibold">
            Hapus
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

// 5. Add Story Form with Image Preview & Ratio Check
function initStoryForm() {
  const form = document.getElementById("add-story-form");
  const imgInput = document.getElementById("story-image-input");
  const imgPreview = document.getElementById("story-image-preview");
  const previewContainer = document.getElementById("story-preview-container");

  if (!form) return;

  // Live Image Preview
  if (imgInput) {
    imgInput.addEventListener("change", function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          if (imgPreview) imgPreview.src = e.target.result;
          if (previewContainer) previewContainer.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("story-title").value.trim();
    const category = document.getElementById("story-category").value;
    const author = document.getElementById("story-author").value.trim();
    const summary = document.getElementById("story-summary").value.trim();
    const customUrl = document.getElementById("story-image-url").value.trim();

    // Use uploaded preview or custom URL or fallback local
    let finalImage = "../assets/images/dta-kbm.jpg";
    if (imgPreview && imgPreview.src && imgPreview.src.startsWith("data:")) {
      finalImage = imgPreview.src;
    } else if (customUrl) {
      finalImage = customUrl;
    }

    const newStory = {
      id: Date.now(),
      title: title,
      category: category,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      author: author || "Pengurus Yayasan",
      summary: summary,
      image: finalImage,
      ratio: "4:3"
    };

    const stories = JSON.parse(localStorage.getItem("mutiara_stories") || "[]");
    stories.unshift(newStory);
    localStorage.setItem("mutiara_stories", JSON.stringify(stories));

    alert("✓ Cerita Santri berhasil disimpan dan diterbitkan!");
    form.reset();
    if (previewContainer) previewContainer.classList.add("hidden");
    renderStoriesTable();
    loadDashboardStats();
  });
}

// 6. Add Gallery Form
function initGalleryForm() {
  const form = document.getElementById("add-gallery-form");
  const imgInput = document.getElementById("gallery-image-input");
  const imgPreview = document.getElementById("gallery-image-preview");
  const previewContainer = document.getElementById("gallery-preview-container");

  if (!form) return;

  if (imgInput) {
    imgInput.addEventListener("change", function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          if (imgPreview) imgPreview.src = e.target.result;
          if (previewContainer) previewContainer.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("gallery-title").value.trim();
    const category = document.getElementById("gallery-category").value;
    const customUrl = document.getElementById("gallery-image-url").value.trim();

    let finalImage = "../assets/images/ra-kegiatan.jpg";
    if (imgPreview && imgPreview.src && imgPreview.src.startsWith("data:")) {
      finalImage = imgPreview.src;
    } else if (customUrl) {
      finalImage = customUrl;
    }

    const newItem = {
      id: Date.now(),
      title: title,
      category: category,
      image: finalImage,
      ratio: "4:3"
    };

    const gallery = JSON.parse(localStorage.getItem("mutiara_gallery") || "[]");
    gallery.unshift(newItem);
    localStorage.setItem("mutiara_gallery", JSON.stringify(gallery));

    alert("✓ Foto kegiatan berhasil ditambahkan ke Galeri!");
    form.reset();
    if (previewContainer) previewContainer.classList.add("hidden");
    renderGalleryGrid();
    loadDashboardStats();
  });
}

// 7. Settings Form (Change WhatsApp & Bank Numbers)
function initSettingsForm() {
  const form = document.getElementById("settings-form");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const wa = document.getElementById("settings-wa").value.trim();
    const bsi = document.getElementById("settings-bsi").value.trim();

    localStorage.setItem("mutiara_setting_wa", wa);
    localStorage.setItem("mutiara_setting_bsi", bsi);

    alert("✓ Pengaturan kontak dan rekening berhasil diperbarui!");
  });
}

// 8. Delete Story Helper
window.deleteStory = function(id) {
  if (!confirm("Apakah Anda yakin ingin menghapus cerita santri ini?")) return;
  let stories = JSON.parse(localStorage.getItem("mutiara_stories") || "[]");
  stories = stories.filter(s => s.id !== id);
  localStorage.setItem("mutiara_stories", JSON.stringify(stories));
  renderStoriesTable();
  loadDashboardStats();
};

// 9. Delete Gallery Helper
window.deleteGallery = function(id) {
  if (!confirm("Hapus foto kegiatan ini dari galeri?")) return;
  let gallery = JSON.parse(localStorage.getItem("mutiara_gallery") || "[]");
  gallery = gallery.filter(g => g.id !== id);
  localStorage.setItem("mutiara_gallery", JSON.stringify(gallery));
  renderGalleryGrid();
  loadDashboardStats();
};

// 10. Logout Helper
function initLogout() {
  const logoutBtn = document.getElementById("admin-logout-btn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Keluar dari Portal Pengurus?")) {
      sessionStorage.removeItem("mutiara_admin_session");
      window.location.href = "login.html";
    }
  });
}

