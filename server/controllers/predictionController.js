const { db } = require("../config/firebase");
const { collection, addDoc, doc, getDoc, serverTimestamp } = require("firebase/firestore");
const { predictionSchema } = require("../validators/predictionValidator");

// mapping index soal ke kategori RIASEC
// soal dikelompokkan per kategori (sesuai quizData.ts)
const categoryMap = {
  Realistic: [],
  Investigative: [],
  Artistic: [],
  Social: [],
  Enterprising: [],
  Conventional: [],
};

// hitung skor RIASEC dari jawaban quiz
function hitungSkorRiasec(answers) {
  // sementara cuyyy / dummy
  const categories = [
    "Realistic",
    "Investigative",
    "Artistic",
    "Social",
    "Enterprising",
    "Conventional",
  ];
  const skor = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const hurufMap = {
    Realistic: "R",
    Investigative: "I",
    Artistic: "A",
    Social: "S",
    Enterprising: "E",
    Conventional: "C",
  };

  const keys = Object.keys(answers).sort((a, b) => Number(a) - Number(b));
  keys.forEach((key, idx) => {
    const catIdx = idx % 6;
    const cat = categories[catIdx];
    skor[hurufMap[cat]] += Number(answers[key]);
  });

  return skor;
}

// tentukan kode 3 huruf dominan
function tentukanKode(skor) {
  const sorted = Object.entries(skor).sort((a, b) => b[1] - a[1]);
  return sorted
    .slice(0, 3)
    .map(([huruf]) => huruf)
    .join("");
}

// POST /api/predictions ---> proses quiz + nilai ---> hasil RIASEC
async function createPrediction(req, res, next) {
  try {
    // validasi body
    const { error, value } = predictionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { answers, nilai } = value;
    const { sessionId } = req.session;

    // hitung skor RIASEC
    const skor = hitungSkorRiasec(answers);
    const kode = tentukanKode(skor);

    // panggil model ML untuk rekomendasi jurusan yang lebih akurat
    // tapi ini cuman sementara cuy ---> rekomendasi placeholder
    const rekomendasi = getRekomendasi(kode);

    const hasil = { kode, skor, rekomendasi };

    // simpan ke firestore database
    const docRef = await addDoc(collection(db, "predictions"), {
      sessionId,
      answers,
      nilai,
      hasil,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      message: "Prediksi berhasil dibuat",
      id: docRef.id,
      hasil,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/predictions/:id ---> ambil hasil prediksi
async function getPrediction(req, res, next) {
  try {
    const { id } = req.params;
    const { sessionId } = req.session;

    const docRef = doc(db, "predictions", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Prediksi tidak ditemukan" });
    }

    const data = docSnap.data();

    // pastikan hanya pemilik yang bisa akses
    if (data.sessionId !== sessionId) {
      return res.status(403).json({ error: "Akses ditolak" });
    }

    res.json({ id: docSnap.id, ...data });
  } catch (err) {
    next(err);
  }
}

// rekomendasi jurusan sederhana berdasarkan kode dominan
function getRekomendasi(kode) {
  const rekomendasiMap = {
    R: ["Teknik Sipil", "Teknik Mesin", "Arsitektur", "Geografi"],
    I: ["Informatika", "Fisika", "Statistika", "Bioteknologi"],
    A: ["Desain Komunikasi Visual", "Sastra", "Seni Rupa", "Film & TV"],
    S: ["Psikologi", "Keguruan", "Ilmu Keperawatan", "Sosiologi"],
    E: ["Manajemen Bisnis", "Ilmu Komunikasi", "Ilmu Politik", "Hukum"],
    C: ["Akuntansi", "Administrasi Publik", "Ilmu Perpustakaan", "Aktuaria"],
  };

  // ambil rekomendasi dari huruf pertama kode dominan
  const primary = kode[0];
  return rekomendasiMap[primary] || [];
}

module.exports = { createPrediction, getPrediction };
