# Website Resmi Yayasan Pendidikan Islam (YPI) Mutiara Ilmu Papakserang (Tarbiyatul Qur'an)

Portal website profil, informasi pendidikan, galeri kegiatan santri, alur donasi, dan manajemen pengurus untuk **Yayasan Pendidikan Islam Mutiara Ilmu Papakserang**, Cibiru, Kota Bandung.

---

## 📁 Struktur Repositori

Proyek ini telah disortir dan dipisahkan secara rapi antara **kode program website** dan **bahan dokumentasi perancangan**:

```text
├── assets/                          # Aset pendukung website
│   ├── css/style.css                # Kustomisasi CSS presisi & rasio anti-gepeng
│   ├── js/main.js                   # Logika interaktif, filter galeri, WA generator, sync
│   └── images/                      # Foto-foto asli dokumentasi santri & kegiatan
├── kelola-internal-mutiara/         # Portal Dashboard Pengurus (CMS Internal)
│   ├── index.html                   # Dashboard admin kelola konten
│   ├── login.html                   # Halaman login pengurus
│   └── admin.js                     # Logika CMS, unggah foto, panduan rasio
├── admin/                           # Direktori Honeypot Keamanan
│   ├── index.html                   # Jebakan 404 & auto-redirect
│   └── login.html                   # Jebakan 404 & auto-redirect
├── docs/                            # Bahan & Dokumen Non-Code
│   └── diagram-userflow/            # Diagram alur pengguna (Draw.io Flowcharts & Skenario)
├── donasi.html                      # Halaman Alur Donasi, Rekening Resmi & WhatsApp
├── index.html                       # Beranda Utama Website Yayasan
├── kegiatan.html                    # Galeri Dokumentasi & Cerita Santri
├── pendidikan.html                  # Profil Unit Pendidikan (RA, DTA, Majelis Ta'lim)
├── tentang.html                     # Profil Lembaga, Sejarah, Legalitas & Struktur Pengurus
├── .gitignore                       # Berkas pengecualian git
└── README.md                        # Dokumentasi teknis proyek
```

---

## 🚀 Fitur Utama Website

1. **Informasi Legalitas & Kredibilitas Transparan:**
   - Pencantuman nomor SK Kemenkumham dan izin operasional Kemenag RI.
   - Profil dewan pembina, pengurus harian, dan asatidz pembimbing.
2. **Jenjang Pendidikan Terpadu:**
   - **RA (Raudhatul Athfal):** Prasekolah islam usia dini.
   - **DTA (Madrasah Diniyah Takmiliyah Awaliyah):** Pendidikan sore hari hafalan Al-Qur'an & fiqih.
   - **Majelis Ta'lim Mutiara Hati:** Kajian keislaman masyarakat dan sakinah keluarga.
3. **Galeri Dokumentasi & Cerita Santri (Anti-Gepeng):**
   - Penegakan rasio aspek gambar proporsional (`aspect-[16/10]`, `ratio-4-3`, dan `ratio-1-1`).
   - Fitur filter kategori unit dan penampil foto perbesar (*lightbox modal*).
4. **Alur Donasi Praktis & Aman:**
   - Fitur salin nomor rekening resmi 1-klik (*copy-to-clipboard*).
   - Generator pesan WhatsApp otomatis untuk konfirmasi infaq.
5. **Keamanan Portal Pengurus:**
   - Tombol admin tersembunyi dari publik.
   - URL login terlindung di jalur rahasia dengan jebakan *honeypot 404* pada jalur `/admin/`.
   - Pintasan akses cepat bagi pengurus via `Ctrl + Shift + A` atau ketukan rahasia di footer.

---

## 💻 Cara Menjalankan Secara Lokal

Website ini berbasis *Modern Static Web* dan dapat dijalankan dengan server lokal mana pun:

### Menggunakan Python (Rekomendasi):
```bash
python -m http.server 5500
```
Buka peramban di: `http://localhost:5500`

### Menggunakan VS Code Live Server:
Klik kanan pada file `index.html` lalu pilih **Open with Live Server**.

---

## 👥 Tim Pengembang
Dikembangkan untuk keperluan Proyek Konsultasi / Rekayasa Perangkat Lunak.
Hak Cipta &copy; 2026 Yayasan Pendidikan Islam Mutiara Ilmu Papakserang.
