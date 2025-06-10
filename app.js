import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import imageRoutes from "./routes/routes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT ;
console.log(process.env.PORT)
// dotenv.config();
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECT_STRING);
    console.log("Connected to MongoDB");
    console.log("Database URL:", process.env.DB_CONNECT_STRING);            
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}
connectDB();

app.use("/api", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
