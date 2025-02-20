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

setInterval(() => {
  logger.info("hej");
}, 1000);