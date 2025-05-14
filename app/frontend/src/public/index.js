import pino from "https://cdn.skypack.dev/pino/browser";

let lastLogPromise = Promise.resolve();

const logger = pino({
    customLevels: { metric: 35 },
    browser: {
        asObject: true,
        transmit: {
            level: "info",
            send: async (level, logEvent) => {
                const msg = logEvent.messages[0];

                lastLogPromise = fetch("http://localhost:3000/log", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ level, msg }),
                });
            },
        },
        write: () => { },
    },
});

const lines = 10000;

const testFunction = async () => {
    const time_start = performance.now();
    for (let i = 0; i < lines; i++) {
        logger.info(`${i}`);
        await lastLogPromise;
    }

    const time_end = performance.now();

    const time_total = time_end - time_start;

    await fetch(`http://localhost:3000/metric?exec_time=${time_total}`, {
        method: "POST",
        mode: "cors",
    });
};

(async () => {
    for (let i = 0; i < 20; i++) {
        await testFunction();
        document.getElementById("counter").innerHTML = ` ${i}`;
    }
})();