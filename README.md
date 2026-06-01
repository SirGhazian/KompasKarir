<div align="center">
<picture>
  <source srcset="https://raw.githubusercontent.com/SirGhazian/kompas-karir/refs/heads/main/public/images/app-logo.png?token=GHSAT0AAAAAADVDORKRRPUPVFPEQMPTFQXE2Q5QZ6Q">
  <img alt="Header" height="100" >
</picture>
</div>

<img src="https://github.com/user-attachments/assets/d37a62f7-650a-4886-81c9-d3809d3ddeed" width="100%" height="2px"/>
<p/>

Platform asesmen berbasis AI yang membantu siswa SMA/SMK menemukan jurusan kuliah yang tepat melalui tes kepribadian RIASEC dan analisis nilai akademik.

## Tentang

KompasKarir menggabungkan teori kepribadian Holland (RIASEC) dengan model machine learning untuk memberikan rekomendasi jurusan kuliah yang personal. Siswa menjawab 72 pertanyaan minat dan memasukkan nilai rapor, kemudian sistem menganalisis profil mereka dan merekomendasikan program studi dari database kampus di Indonesia.

**Capstone Project** Coding Camp 2026 oleh Dicoding × DBS Foundation (Tim PSU305)

## Fitur

- **Tes RIASEC** → 72 pertanyaan minat dengan skala 1-5, diacak setiap sesi
- **Input Nilai Akademik** → 9 mata pelajaran dikelompokkan dalam 5 kategori
- **Analisis AI** → Prediksi rumpun jurusan (TensorFlow) + narasi kepribadian (Gemini)
- **Rekomendasi Jurusan** → Matching ke database kampus dengan filter provinsi & golongan UKT
- **Detail UKT** → Informasi biaya kuliah per golongan (I-VIII) untuk setiap program studi
- **Bagikan Hasil** → Link publik yang bisa dibagikan tanpa perlu login
- **Ulasan Pengguna** → Rating dan testimoni tersimpan di database
- **Responsif** → Tampilan optimal di desktop dan mobile

## Tech Stack

| Layer     | Teknologi                                            |
| --------- | ---------------------------------------------------- |
| Framework | Next.js 16 (App Router)                              |
| UI        | React 19, Tailwind CSS v4                            |
| Icons     | react-icons                                          |
| Font      | Manrope + Lexend (Google Fonts)                      |
| Backend   | Express.js ([repo terpisah](server/))                |
| Database  | Firebase Firestore                                   |
| AI/ML     | TensorFlow + Gemini (Huggingface Spaces)             |
| Deploy    | Vercel (frontend), Huggingface Spaces (backend + AI) |

## Memulai

### Prasyarat

- Node.js 18+
- npm

### Instalasi

```bash
git clone https://github.com/SirGhazian/kompas-karir.git
cd kompas-karir
npm install
```

### Environment Variables

Buat file `.env.local` di root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Untuk production, ganti dengan URL backend yang sudah di-deploy.

### Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

> **Catatan:** Frontend membutuhkan backend server berjalan untuk fitur quiz, prediksi, ulasan, dan bagikan. Lihat [dokumentasi backend](server/README.md) untuk setup.

### Build

```bash
npm run build
npm start
```

## Struktur Project

```
├── app/                    # Halaman (Next.js App Router)
│   ├── page.tsx            # Landing page
│   ├── instruksi/          # Panduan sebelum tes
│   ├── quiz/               # Tes RIASEC + input nilai
│   ├── hasil/              # Hasil analisis + rekomendasi
│   ├── share/[id]/         # Halaman publik share
│   ├── tentang/            # Tentang metode RIASEC
│   ├── ulasan/             # Testimoni pengguna
│   ├── about/              # Tim pengembang
│   └── not-found.tsx       # Halaman 404
├── components/
│   ├── layout/             # Navbar, Footer
│   └── ui/                 # Komponen reusable
├── utils/
│   ├── api.ts              # API client + token management
│   ├── dataKampus.ts       # Database program studi
│   ├── matchKampus.ts      # Helper matching & format
│   └── riasecInfo.ts       # Info tipe kepribadian
├── public/                 # Aset statis
└── server/                 # Backend Express.js
```

## Halaman

| Halaman     | Path                 | Deskripsi                                         |
| ----------- | -------------------- | ------------------------------------------------- |
| Landing     | `/`                  | Hero, cara kerja, kenapa RIASEC, FAQ              |
| Instruksi   | `/instruksi`         | Panduan pengisian tes                             |
| Quiz        | `/quiz`              | 72 soal + form nilai akademik                     |
| Hasil       | `/hasil`             | Tipe dominan, radar chart, narasi AI, rekomendasi |
| Rekomendasi | `/hasil/rekomendasi` | Daftar prodi + filter + detail UKT                |
| Share       | `/share/[id]`        | Hasil tes yang dibagikan (publik)                 |
| Tentang     | `/tentang`           | Metode RIASEC, dimensi, alur                      |
| Ulasan      | `/ulasan`            | Rating & testimoni pengguna                       |
| About       | `/about`             | Tim pengembang PSU305                             |

## Tim Pengembang

| ID             | Nama                                  | Peran                    |
| -------------- | ------------------------------------- | ------------------------ |
| CDCC282D6Y1250 | Carli Tamba                           | Data Scientist           |
| CDCC012D6Y1245 | Muhammad Firman Ardiansyah            | Data Scientist           |
| CFCC282D6Y0786 | Muhammad Ghazian Tsaqif Zhafiri Andoz | Full-Stack Web Developer |
| CFCC955D6Y1821 | Dhimas Setyo Wahyu Santoso            | Full-Stack Web Developer |
| CACC282D6Y0961 | Ridho Hamdani Putra                   | AI Engineer              |
| CACC282D6X0960 | Setya Carina Rianti                   | AI Engineer              |

## Lisensi

Proyek ini dikembangkan sebagai bagian dari program Coding Camp 2026 (Dicoding × DBS Foundation).

## Links

| Service                | URL                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| Frontend (Vercel)      | [kompaskarir.vercel.app](https://kompaskarir.vercel.app)                                     |
| Backend (Huggingface)  | [SirGhazian/kompaskarir-backend](https://huggingface.co/spaces/SirGhazian/kompaskarir-backend) |
| AI Model (Huggingface) | [RidhoHamdani/kompaskarir-ai](https://huggingface.co/spaces/RidhoHamdani/kompaskarir-ai)       |
| GitHub                 | [SirGhazian/kompas-karir](https://github.com/SirGhazian/kompas-karir)                          |
