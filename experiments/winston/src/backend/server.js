import { createLogger, format, transports } from "winston";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "mm:ss SSS" }),
    format.printf((info) => `${info.timestamp}: ${info.message}`),
  ),
  transports: [new transports.Console()],
});

app.post("/log", (req, res) => {
  logger.info(req.body.message);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
