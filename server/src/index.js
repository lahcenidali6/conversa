import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors({ origin: ["http://localhost:5173","https://conversa-xi.vercel.app"], credentials: true }));
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server are runnig on port ${PORT}`);
  connectDB();
});
