const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const imageRoutes = require("./routes/routes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECT_STRING);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}
connectDB();

app.use("/api", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
