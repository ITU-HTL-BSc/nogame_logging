const id = crypto.randomUUID();

const lines = 1000;
const maxTests = 10;
let timeTotal = 0;
let countTests = 0;

const testFunction = () => {
    const time_start = performance.now();
    sendLog("info", time_start);
    for (let i = 1; i < lines - 1; i++) {
        sendLog("info", `${performance.now()} - ${i}`);
    }
    const time_end = performance.now();
    sendLog("info", time_end);

    countTests++;
    timeTotal += time_end - time_start;
    if (countTests >= maxTests) {
        sendLog("metric", `Execution Time: ${timeTotal} ms`);
        sendLog("metric", `Average Time: ${timeTotal / maxTests} ms`);
        sendLog("metric", `Lines/ms: ${lines / (timeTotal / maxTests)}`);
        clearInterval(interval);
    }
};

const sendLog = async (level, msg) => {
    const response = await fetch("http://localhost:3000/log", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ level, id, msg }),
    });
    return response;
};

testFunction();
