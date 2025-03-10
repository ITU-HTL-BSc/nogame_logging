const express = require("express");
const cors = require("cors");
const logger = require("./logger");

const app = express();

// map from id to set of log messages
const idToLogs = new Map();

app.use(cors());
app.use(express.json());

app.get("/healthCheck", (_, res) => {
    res.status(200).send({ status: "OK" });
});

app.post("/log", (req, res) => {
    const { level, ...logData } = req.body;
    addToSet(logData["id"], logData["msg"]);
    logger[level](logData);
    res.sendStatus(200);
});

app.get("/logs", (_, res) => {
    const sizes = {};
    idToLogs.forEach((value, key) => {
        sizes[key] = value.size;
    });
    res.status(200).send(sizes);
});

function addToSet(id, msg) {
    if (!idToLogs.has(id)) {
        idToLogs.set(id, new Set());
    }
    idToLogs.get(id).add(msg);
}

const PORT = 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    console.log(`Server is running on port ${PORT}`);
});
