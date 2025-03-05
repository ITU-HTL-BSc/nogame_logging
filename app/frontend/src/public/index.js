import pino from 'https://cdn.skypack.dev/pino/browser';

const logger = pino({
    browser: {
        asObject: true,
        transmit: {
            level: 'info',
            send: (level, logEvent) => {
                const msg = logEvent.messages[0];
                fetch('http://localhost:3000/log', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ level, msg })
                });
            }
        }
    }
});

const lines = 1000;
const maxTests = 10;
let timeTotal = 0;
let countTests = 0;

const testFunction = () => {
    const time_start = Date.now();
    logger.info(time_start);
    for (let i = 1; i <= lines - 1; i++) {
        logger.info(`${Date.now()} - ${i}`);
    }
    const time_end = Date.now();
    logger.info(time_end);

    countTests++;
    timeTotal += time_end - time_start;
    if (countTests >= maxTests) {
        logger.info(`Execution Time: ${timeTotal} ms`);
        logger.info(`Average Time: ${timeTotal / maxTests} ms`);
        logger.info(`Lines/ms: ${lines / (timeTotal / maxTests)}`);
        clearInterval(interval);
    }
}

const interval = setInterval(testFunction, 2000);