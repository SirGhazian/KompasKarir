const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// POST /api/sessions ---> generate anonymous jwt
async function createSession(req, res, next) {
  try {
    const sessionId = uuidv4();
    const userAgent = req.headers["user-agent"] || "unknown";

    const token = jwt.sign({ sessionId, userAgent }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "Session berhasil dibuat",
      token,
      sessionId,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createSession };
