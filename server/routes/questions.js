const express = require("express");
const router = express.Router();
const { getQuestions } = require("../controllers/questionController");

// GET /api/questions - kirim soal diacak (publik)
router.get("/", getQuestions);

module.exports = router;
