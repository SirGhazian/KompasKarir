const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sessionRoutes = require("./routes/sessions");
const predictionRoutes = require("./routes/predictions");
const reviewRoutes = require("./routes/reviews");
const questionRoutes = require("./routes/questions");
const shareRoutes = require("./routes/shares");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/sessions", sessionRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/shares", shareRoutes);

// root endpoint
app.get("/", (req, res) => {
  res.json({ message: "KompasKarir API is running" });
});

// ini utk error handler eak
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
