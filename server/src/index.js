import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { app ,server} from "./lib/socket.js";

dotenv.config();
app.use(cors({ origin: "https://conversa-xi.vercel.app", credentials: true }));
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`server are runnig on port ${PORT}`);
  connectDB();
});
