const id = crypto.randomUUID();

const logger = JL(`${id}`);

var ajaxAppender = JL.createAjaxAppender(`${id}`);
ajaxAppender.setOptions({
    "url": "http://localhost:3000/log",
    "batchSize": 1,
    "maxBatchSize": 1,
    "batchTimeout": 0,
});

JL().setOptions({ "appenders": [ajaxAppender] });

const lines = 10000;

const testFunction = () => {
    const time_start = performance.now();
    for (let i = 0; i < lines; i++) {
        logger.info(`${performance.now()} - ${i}`);
    }
    const time_end = performance.now();

    const timeTotal = time_end - time_start;

    logger.log(3500, `Execution Time: ${timeTotal} ms`);
    logger.log(3500, `Lines/ms: ${lines / timeTotal}`);
}

testFunction();