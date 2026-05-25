const { db } = require("../config/firebase");
const { collection, addDoc, getDocs, query, where, orderBy } = require("firebase/firestore");
const { reviewSchema } = require("../validators/reviewValidator");

// POST /api/reviews --->tulis ulasan baru
async function createReview(req, res, next) {
  try {
    // validasi body
    const { error, value } = reviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nama, rating, text } = value;
    const { sessionId } = req.session;
    const userAgent = req.headers["user-agent"] || "unknown";

    // cek apakah session ini sudah pernah submit review
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("sessionId", "==", sessionId));
    const existing = await getDocs(q);

    if (!existing.empty) {
      return res.status(409).json({ error: "Anda sudah pernah memberikan ulasan" });
    }

    // simpan ke firestore databasee
    const docRef = await addDoc(reviewsRef, {
      sessionId,
      nama,
      rating,
      text,
      userAgent,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      message: "Ulasan berhasil disimpan",
      id: docRef.id,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/reviews ---> list semua ulasan
async function getReviews(req, res, next) {
  try {
    const reviewsRef = collection(db, "reviews");
    const snapshot = await getDocs(reviewsRef);

    const reviews = [];
    snapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });

    // sort by createdAt descending (menurun ini ya)
    reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      total: reviews.length,
      reviews,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/reviews/me --- cek apakah session ini sudah pernah review
async function getMyReview(req, res, next) {
  try {
    const { sessionId } = req.session;
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("sessionId", "==", sessionId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ exists: false });
    }

    const doc = snapshot.docs[0];
    res.json({ exists: true, review: { id: doc.id, ...doc.data() } });
  } catch (err) {
    next(err);
  }
}

module.exports = { createReview, getReviews, getMyReview };
