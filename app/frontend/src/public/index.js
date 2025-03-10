const id = crypto.randomUUID();

const logger = JL(`${id}`);

var ajaxAppender = JL.createAjaxAppender(`${id}`);
ajaxAppender.setOptions({ 
    "url": "http://localhost:3000/log", 
    "batchSize": 1,
    "maxBatchSize": 1,
});

JL().setOptions({ "appenders": [ajaxAppender] });

const lines = 1000;
const maxTests = 10;
let timeTotal = 0;
let countTests = 0;

const testFunction = () => {
    const time_start = performance.now();
    logger.info(time_start);
    for (let i = 1; i < lines - 1; i++) {
        logger.info(`${performance.now()} - ${i}`);
    }
    const time_end = performance.now();
    logger.info(time_end);

    countTests++;
    timeTotal += time_end - time_start;
    if (countTests >= maxTests) {
        logger.log(3500, `Execution Time: ${timeTotal} ms`);
        logger.log(3500, `Average Time: ${timeTotal / maxTests} ms`);
        logger.log(3500, `Lines/ms: ${lines / (timeTotal / maxTests)}`);
        clearInterval(interval);
    }
}

const interval = setInterval(testFunction, 2000);