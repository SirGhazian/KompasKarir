const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const { createReview, getReviews } = require("../controllers/reviewController");

// GET /api/reviews ---> list semua ulasan (publik)
router.get("/", getReviews);

// POST /api/reviews ---> tulis ulasan baru (perlu token)
router.post("/", authToken, createReview);

module.exports = router;
