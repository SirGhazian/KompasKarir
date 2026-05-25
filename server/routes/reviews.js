const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const { createReview, getReviews, getMyReview } = require("../controllers/reviewController");

// GET /api/reviews ---> list semua ulasan (publik)
router.get("/", getReviews);

// GET /api/reviews/me ---> cek apakah user sudah pernah review
router.get("/me", authToken, getMyReview);

// POST /api/reviews ---> tulis ulasan baru (perlu token)
router.post("/", authToken, createReview);

module.exports = router;
