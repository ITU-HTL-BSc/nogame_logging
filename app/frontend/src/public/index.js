const logger = pino({
    browser: {
      transmit: {
        level: 'info',
        send: (level, logEvent) => {
          const msg = logEvent.messages[0];
          fetch('/log', {
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

lines = 1000;
timeTotal = 0;
countTests = 0;
maxTests = 10;

const testFunction = () => {
    time_start = Date.now();
    logger.info(time_start);
    for (let i = 1; i <= lines-1; i++) {
        logger.info(`${Date.now()} - ${i}`);
    }
    time_end = Date.now();
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