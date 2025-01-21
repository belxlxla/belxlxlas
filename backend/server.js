import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors"; // CORS 추가
import { handleEmailSend } from "./email/send-email.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// CORS 설정
const corsOptions = {
  origin: ["http://localhost:3000", "https://belxlxla.com"], 
  methods: ["GET", "POST"], 
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions)); 

app.use(express.json());

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// AWS 상태 체크
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 메일 발송 
app.post("/api/send-email", handleEmailSend);

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
