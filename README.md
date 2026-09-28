# TMS BI Enterprise

Sistem Manajemen Transportasi (Transport Management System - TMS) & Business Intelligence (BI) Enterprise. Aplikasi ini dibangun untuk memantau, mengelola, dan menganalisis seluruh aktivitas operasional logistik, master data, keuangan, hingga analitik pada level perusahaan.

## 🚀 Fitur Utama (Modules)
- **Dashboard & Analytics**: Ringkasan data operasional dan grafik metrik performa perusahaan.
- **Operasional**: Manajemen pesanan (Order Management), pengiriman (Delivery Order), pemeliharaan armada (Maintenance), penugasan (Planner Assignment), pelacakan (Tracking), dan POD.
- **Finance**: Manajemen tagihan (Penagihan), pembayaran (Payment), dan modul keuangan lainnya.
- **Master Data**: Pengelolaan data inti seperti kendaraan (Vehicle), driver, dan lainnya.
- **Sistem**: Pengaturan sistem dan pelaporan (Reports).
- **Autentikasi (Auth)**: Sistem login dan manajemen sesi pengguna.

## 🛠️ Teknologi yang Digunakan
Proyek ini dikembangkan menggunakan tumpukan teknologi modern:
- **Core**: React 19, TypeScript, Vite
- **Styling & UI**: Tailwind CSS v4, Material UI (MUI), Emotion, Lucide React
- **State Management**: Zustand & Redux Toolkit
- **Routing**: React Router DOM
- **Charts & Maps**: Recharts, Leaflet (React Leaflet)
- **Animasi**: Framer Motion
- **Linting**: Oxlint

## 📂 Struktur Proyek
```text
tms-bi-enterprise/
├── public/                # Aset statis publik
├── src/
│   ├── app/               # Konfigurasi level aplikasi (store, router, dll)
│   ├── features/          # Modul fitur utama (auth, dashboard, finance, masterData, operational, system)
│   ├── shared/            # Komponen, utilitas, dan hook yang dapat digunakan ulang (reusable)
│   ├── index.css          # Styling global
│   └── main.tsx           # Entry point React
├── index.html             # Entry point HTML
├── package.json           # Konfigurasi dependensi dan script npm
├── vite.config.ts         # Konfigurasi Vite
└── ... (konfigurasi lainnya)
```

## ⚙️ Persyaratan Sistem
Sebelum memulai, pastikan Anda telah menginstal:
- **Node.js** (Disarankan versi LTS terbaru, e.g., v18+ atau v20+)
- **npm** (Biasanya sudah sepaket dengan Node.js)

## 💻 Panduan Instalasi (Pembuatan sampai Menjalankan)

### 1. Kloning Repositori
Clone proyek ini ke dalam direktori lokal Anda:
```bash
git clone https://github.com/andrajeff23/tms-enterprise-bi.git
cd tms-bi-enterprise
```

### 2. Instalasi Dependensi
Jalankan perintah berikut untuk menginstal semua package dan library yang dibutuhkan aplikasi:
```bash
npm install
```

### 3. Menjalankan Mode Development
Untuk menjalankan proyek di environment lokal (development) dengan fitur Hot Module Replacement (HMR):
```bash
npm run dev
```
Setelah perintah dijalankan, server lokal akan aktif (biasanya di `http://localhost:5173`). Buka URL tersebut di browser Anda untuk melihat aplikasi.

### 4. Build untuk Production
Untuk mem-build proyek agar siap di-deploy ke production:
```bash
npm run build
```
Perintah ini akan melakukan pengecekan tipe data (`tsc -b`) dan mengompilasi kode menggunakan Vite ke dalam folder `dist/`.

### 5. Preview Mode Production (Lokal)
Jika Anda ingin melihat hasil build production di environment lokal:
```bash
npm run preview
```

### 6. Linting Kode
Untuk mengecek kualitas kode menggunakan Oxlint:
```bash
npm run lint
```
