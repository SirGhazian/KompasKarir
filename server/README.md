# KompasKarir (Backend Server)

RESTful API server untuk platform KompasKarir. Menjadi perantara antara frontend (Next.js) dan model AI (FastAPI di Huggingface), serta mengelola data di Firebase Firestore.

## Tech Stack

| Layer     | Teknologi                                  |
| --------- | ------------------------------------------ |
| Framework | Express.js 5                               |
| Database  | Firebase Firestore                         |
| Auth      | JWT (anonymous session)                    |
| Validasi  | Joi                                        |
| AI        | FastAPI di Huggingface Spaces (SSE stream) |
| Deploy    | Huggingface Spaces (Docker)                |

## Memulai

### Prasyarat

- Node.js 18+
- npm
- Project Firebase dengan Firestore aktif

### Instalasi

```bash
cd server
npm install
```

### Environment Variables

Buat file `.env` di folder `server/`:

```env
PORT=5000
JWT_SECRET=your-secret-key

AI_API_URL=https://ridhohamdani-kompaskarir-ai.hf.space
INTERNAL_API_KEY=your-ai-api-key

FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
```

### Menjalankan Server

```bash
node index.js
```

Server berjalan di `http://localhost:5000` (atau port dari env).

## API Endpoints

| Method | Endpoint               | Auth | Deskripsi                           |
| ------ | ---------------------- | ---- | ----------------------------------- |
| `POST` | `/api/sessions`        | ✖    | Generate anonymous JWT token        |
| `GET`  | `/api/questions`       | ✖    | Ambil 72 soal RIASEC (diacak)       |
| `POST` | `/api/predictions`     | ✔    | Kirim jawaban + nilai → analisis AI |
| `GET`  | `/api/predictions/:id` | ✔    | Ambil hasil prediksi tersimpan      |
| `POST` | `/api/reviews`         | ✔    | Tulis ulasan baru                   |
| `GET`  | `/api/reviews`         | ✖    | List semua ulasan                   |
| `GET`  | `/api/reviews/me`      | ✔    | Cek apakah sudah pernah review      |
| `POST` | `/api/shares`          | ✔    | Simpan hasil untuk dibagikan        |
| `GET`  | `/api/shares/:id`      | ✖    | Ambil data share (publik)           |

### Autentikasi

Endpoint yang membutuhkan auth menggunakan header:

```
Authorization: Bearer <token>
```

Token didapat dari `POST /api/sessions`. Expire dalam 7 hari.

## Struktur Folder

```
server/
├── index.js                # Entry point
├── package.json
├── config/
│   └── firebase.js         # Inisialisasi Firestore
├── data/
│   └── quizData.js         # 72 soal RIASEC + mapping kategori
├── routes/
│   ├── sessions.js
│   ├── questions.js
│   ├── predictions.js
│   ├── reviews.js
│   └── shares.js
├── controllers/
│   ├── sessionController.js
│   ├── questionController.js
│   ├── predictionController.js
│   ├── reviewController.js
│   └── shareController.js
├── services/
│   └── aiService.js        # Panggil model AI + parse SSE
├── utils/
│   └── nilaiHelper.js      # Mapping 9 mapel → 5 kategori
├── validators/
│   ├── predictionValidator.js
│   └── reviewValidator.js
└── middleware/
    ├── authToken.js        # Verifikasi JWT
    └── errorHandler.js     # Error handler global
```

## Alur Prediksi

```
Frontend kirim { answers (72), nilai (9) }
  → Validasi Joi (72 jawaban, 9 nilai 0-100)
  → Hitung skor RIASEC: ((raw - 12) / 48) × 100
  → Agregasi nilai: 9 mapel → 5 kategori (bahasa, logika, sains, sosial, praktik)
  → Panggil AI: POST /api/analyze (SSE stream)
  → Parse response: event prediction + event narasi
  → Simpan ke Firestore
  → Return hasil ke frontend
```

## Firestore Collections

### `predictions`

```json
{
  "sessionId": "uuid",
  "answers": { "0": 4, "1": 3, ..., "71": 5 },
  "nilai": { "bahasaIndonesia": 85, ... },
  "hasil": {
    "kode_riasec": "IAE",
    "prediksi_utama": "Sains & Teknologi",
    "top_personality": [...],
    "rekomendasi": [...],
    "narasi": { "ringkasan": "...", "kekuatan": [...], ... },
    "skorRiasec": { "r": 45.8, "i": 87.5, ... }
  },
  "createdAt": "ISO timestamp"
}
```

### `reviews`

```json
{
  "sessionId": "uuid",
  "nama": "Budi",
  "rating": 5,
  "text": "Sangat membantu!",
  "userAgent": "Mozilla/5.0 ...",
  "createdAt": "ISO timestamp"
}
```

### `shares`

```json
{
  "sessionId": "uuid",
  "hasil": { ... },
  "createdAt": "ISO timestamp"
}
```

## Deployment (Huggingface Spaces)

Server di-deploy menggunakan Docker di Huggingface Spaces.

### Dockerfile

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
ENV PORT=7860
EXPOSE 7860
CMD ["node", "index.js"]
```

### Setup

1. Buat Space baru di Huggingface → pilih Docker
2. Upload seluruh isi folder `server/`
3. Set environment variables di Settings → Variables
4. Space akan build dan deploy otomatis

## Dependencies

| Package      | Fungsi                    |
| ------------ | ------------------------- |
| express      | Framework REST API        |
| cors         | Cross-origin request      |
| dotenv       | Environment variables     |
| firebase     | Firestore SDK             |
| jsonwebtoken | Generate & verifikasi JWT |
| uuid         | ID unik untuk session     |
| joi          | Validasi request body     |

## Links

| Deployment                    | URL                                                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Deployment Frontend (Vercel)  | [kompaskarir.vercel.app](https://kompaskarir.vercel.app)                                                     |
| Deployment Backend (HuggingFace) | [SirGhazian/kompaskarir-backend](https://huggingface.co/spaces/SirGhazian/kompaskarir-backend)          |
| Deployment AI Model (HuggingFace) | [RidhoHamdani/kompaskarir-ai](https://huggingface.co/spaces/RidhoHamdani/kompaskarir-ai)              |

| Source Code  | URL                                          |
| ------------ | -------------------------------------------- |
| Main GitHub  | [KompasKarir](https://github.com/KompasKarir) |
