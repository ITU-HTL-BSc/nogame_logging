const express = require("express");
const cors = require("cors");
const logger = require("./logger");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/log", (req, res) => {
    const { level, msg } = req.body;
    logger[level](msg);
    res.sendStatus(200);
});

const PORT = 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
