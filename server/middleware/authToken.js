const jwt = require("jsonwebtoken");

// middleware ---> verifikasi jwt dari header authorization
function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.session = decoded; // { sessionId, userAgent, iat, exp }
    next();
  } catch (err) {
    // 401 = token invalid/expired (bukan 403 yang dipakai untuk akses ditolak)
    return res.status(401).json({ error: "Token tidak valid atau sudah expired" });
  }
}

module.exports = authToken;
