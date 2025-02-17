import express from "express";
import cors from "cors";
import { createLogger, format, transports } from "winston";

const app = express();
app.use(express.json()); // Enable JSON request body parsing
app.use(cors()); // Allow cross-origin requests from the browser

// Set up Winston logger
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs.log" }),
  ],
});

// API route to receive keypress logs
app.post("/log", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  logger.info(message);
  res.json({ success: true });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
