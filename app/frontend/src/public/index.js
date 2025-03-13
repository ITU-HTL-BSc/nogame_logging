import pino from "https://cdn.skypack.dev/pino/browser";

const id = crypto.randomUUID();

let lastLogPromise = Promise.resolve();

const logger = pino({
    customLevels: { metric: 35 },
    browser: {
        asObject: true,
        transmit: {
            level: "info",
            send: async (level, logEvent) => {
                const msg = logEvent.messages[0];

                lastLogPromise = lastLogPromise.then(() => {
                    return fetch("http://localhost:3000/log", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ level, id, msg }),
                    });
                });

                await lastLogPromise;
            },
        },
        write: () => { },
    },
});

const lines = 10000;

const testFunction = async () => {
    const time_start = performance.now();
    for (let i = 0; i < lines; i++) {
        logger.info(`${performance.now()} - ${i}`);
    }

    await lastLogPromise;
    const time_end = performance.now();

    const timeTotal = time_end - time_start;

    logger.metric(`Execution Time: ${timeTotal} ms`);
    logger.metric(`Lines/ms: ${lines / timeTotal}`);
};

testFunction();
