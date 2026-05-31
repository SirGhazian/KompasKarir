const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const { createShare, getShare } = require("../controllers/shareController");

// POST /api/shares ---> simpan hasil untuk dibagikan (perlu token)
router.post("/", authToken, createShare);

// GET /api/shares/:id ---> ambil data share (publikk)
router.get("/:id", getShare);

module.exports = router;
