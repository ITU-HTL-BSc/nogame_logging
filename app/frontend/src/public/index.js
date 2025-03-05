const logger = JL("performanceLogger");

var ajaxAppender = JL.createAjaxAppender('ajaxAppender');
ajaxAppender.setOptions({ 
    "url": "http://localhost:3000/log", 
    "batchSize": 1,
    "maxBatchSize": 1,
});

JL().setOptions({ "appenders": [ajaxAppender] });

lines = 1000;
timeTotal = 0;
countTests = 0;
maxTests = 10;

const testFunction = () => {
    time_start = performance.now();
    logger.info(time_start);
    for (let i = 1; i <= lines - 1; i++) {
        logger.info(`${performance.now()} - ${i}`);
    }
    time_end = performance.now();
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