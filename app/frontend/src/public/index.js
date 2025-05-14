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

                lastLogPromise = lastLogPromise.then(() => {
                    return fetch("http://localhost:3000/log", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ level, msg }),
                    });
                });

                await lastLogPromise;
            },
        },
        write: () => {},
    },
});

const duration = 30000; // 30 seconds in milliseconds

const testFunction = async () => {
    const time_start = performance.now();
    let total_lines = 0;

    while (performance.now() - time_start < duration) {
        logger.info(`${total_lines}`);
        total_lines++;
    }

    await fetch(`http://localhost:3000/metric?total_lines=${total_lines}`, {
        method: "POST",
        mode: "cors",
    });
};

(async () => {
    for (let i = 0; i < 5; i++) {
        await testFunction();
        document.getElementById("counter").innerHTML = ` ${i + 1}`;
    }
})();
