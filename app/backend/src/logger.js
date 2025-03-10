const fs = require("fs");
const path = require("path");
const pino = require("pino");

const logDir = path.resolve(__dirname, "../logs");
const logFile = path.join(logDir, "app.log");

fs.mkdirSync(logDir, { recursive: true });
fs.writeFileSync(logFile, "");

const transport = pino.transport({
    target: "pino/file",
    options: { destination: logFile },
});

const logger = pino(
    {
        level: "info",
        customLevels: {
            metric: 35,
        },
    },
    transport
);

module.exports = logger;
