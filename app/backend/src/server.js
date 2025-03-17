const express = require("express");
const cors = require("cors");
const logger = require("./logger");
const db = require("./db");

const levelMap = {
    1000: "trace",
    2000: "debug",
    3000: "info",
    3500: "metric",
    4000: "warn",
    5000: "error",
    6000: "fatal",
};

const app = express();

// map from id to set of log messages
const idToLogs = new Map();
const env = "jsnlog";

app.use(cors());
app.use(express.json());

app.get("/healthCheck", (_, res) => {
    res.status(200).send({ status: "OK" });
});

app.post("/log", (req, res) => {
    const { lg: logs = [] } = req.body;

    logs.forEach((log) => {
        const level = levelMap[log.l];
        const id = log.n;
        const msg = log.m;

        addToSet(id, msg);
        logger[level]({ id }, msg);
    });

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

app.post("/metric", (req, res) => {
    const { exec_time, lines_per_sec } = req.query;

    if (!exec_time || !lines_per_sec) {
        res.status(400).send("Missing metric parameters.");
        return;
    }
    logger.metric(`Added metric: ${exec_time}, ${lines_per_sec}`);
    db.insertMetrics(env, parseFloat(exec_time), parseFloat(lines_per_sec));
    res.sendStatus(200);
});

const PORT = 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    console.log(`Server is running on port ${PORT}`);
    db.dbInit(env);
});
