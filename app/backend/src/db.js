const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const dbDir = path.resolve(__dirname, "../db");
const dbFile = path.join(dbDir, "metrics.db");

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbFile);

function dbInit(environment) {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS metrics_${environment} (
                id INTEGER PRIMARY KEY,
                uuid TEXT,
                exec_time REAL,
                lines INTEGER,
                tests INTEGER
            )`);
    });
}

function insertMetrics(environment, uuid, exec_time, lines, tests) {
    db.serialize(() => {
        db.run(
            `INSERT INTO metrics_${environment}  (uuid, exec_time, lines, tests)
            VALUES (?, ?, ?, ?)`,
            [uuid, exec_time, lines, tests]
        );
    });
}

module.exports = { dbInit, insertMetrics };
