const express = require("express");
const router = express.Router();
const { createSession } = require("../controllers/sessionController");

// POST /api/sessions ---> generate anonymous jwt
router.post("/", createSession);

module.exports = router;
