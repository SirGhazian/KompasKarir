const { db } = require("../config/firebase");
const { collection, addDoc, doc, getDoc } = require("firebase/firestore");
const { predictionSchema } = require("../validators/predictionValidator");
const { getCategoryById } = require("../data/quizData");
const { agregasiNilai } = require("../utils/nilaiHelper");
const { analyzeRiasec } = require("../services/aiService");

// hitung skor RIASEC dari jawaban quiz (scaled 0–100, key lowercase)
function hitungSkorRiasec(answers) {
  const raw = { r: 0, i: 0, a: 0, s: 0, e: 0, c: 0 };

  // sum jawaban per kategori berdasarkan ID soal
  for (const [id, value] of Object.entries(answers)) {
    const category = getCategoryById(Number(id));
    if (category) {
      raw[category.toLowerCase()] += value;
    }
  }

  // scaling atau mapping atau apalah namanya wkwkwk ((raw - 12) / 48) * 100
  const scaled = {};
  for (const [cat, score] of Object.entries(raw)) {
    scaled[cat] = Math.round(((score - 12) / 48) * 100 * 100) / 100;
  }

  return scaled;
}

// POST /api/predictions ---> proses quiz + nilai ---> hasil RIASEC dari AI
async function createPrediction(req, res, next) {
  try {
    // validasi body
    const { error, value } = predictionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { answers, nilai } = value;
    const { sessionId } = req.session;

    // hitung skor RIASEC (lowercase, 0–100)
    const skorRiasec = hitungSkorRiasec(answers);

    // agregasi 9 mapel → 5 kategori akademik
    const akademik = agregasiNilai(nilai);

    // panggil model AI di huggingface
    let aiResult;
    try {
      aiResult = await analyzeRiasec(skorRiasec, akademik, 3);
    } catch (aiErr) {
      console.error("AI error:", aiErr.message);
      return res.status(502).json({ error: `Gagal memproses analisis AI: ${aiErr.message}` });
    }

    const { prediction, narasi } = aiResult;

    // susun hasil lengkap
    const hasil = {
      kode_riasec: prediction.kode_riasec,
      prediksi_utama: prediction.prediksi_utama,
      top_personality: prediction.top_personality,
      rekomendasi: prediction.rekomendasi,
      narasi: narasi ? narasi.narasi : "",
      skorRiasec,
    };

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

module.exports = { createPrediction, getPrediction };
