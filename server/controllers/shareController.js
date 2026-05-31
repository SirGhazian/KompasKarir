const { db } = require("../config/firebase");
const { collection, addDoc, doc, getDoc } = require("firebase/firestore");

// POST /api/shares ---> simpan hasil untuk dibagikan
async function createShare(req, res, next) {
  try {
    const { hasil } = req.body;
    const { sessionId } = req.session;

    if (!hasil || !hasil.kode_riasec) {
      return res.status(400).json({ error: "Data hasil tidak valid" });
    }

    const docRef = await addDoc(collection(db, "shares"), {
      sessionId,
      hasil,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      message: "Share berhasil dibuat",
      shareId: docRef.id,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/shares/:id ---> ambil data share (publik btw)
async function getShare(req, res, next) {
  try {
    const { id } = req.params;

    const docRef = doc(db, "shares", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Link tidak valid atau sudah dihapus" });
    }

    const data = docSnap.data();

    res.json({
      id: docSnap.id,
      hasil: data.hasil,
      createdAt: data.createdAt,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createShare, getShare };
