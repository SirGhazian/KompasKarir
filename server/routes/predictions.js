const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const { createPrediction, getPrediction } = require("../controllers/predictionController");

// POST /api/predictions ---> kirim quiz + nilai ---> hasil RIASEC
router.post("/", authToken, createPrediction);

// GET /api/predictions/:id ---> ambil hasil prediksi tersimpan
router.get("/:id", authToken, getPrediction);

module.exports = router;
