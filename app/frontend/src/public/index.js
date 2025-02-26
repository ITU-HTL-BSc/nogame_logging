const lines = 1000;
const maxTests = 10;
let timeTotal = 0;
let countTests = 0;

const testFunction = () => {
    const time_start = performance.now();
    sendLog("info",time_start);
    for (let i = 1; i <= lines-1; i++) {
        sendLog("info",`${performance.now()} - ${i}`);
    }
    const time_end = performance.now();
    sendLog("info",time_end);

    countTests++;
    timeTotal += time_end - time_start;
    if (countTests >= maxTests) {
        sendLog("info",`Execution Time: ${timeTotal} ms`);
        sendLog("info",`Average Time: ${timeTotal / maxTests} ms`);
        sendLog("info",`Lines/ms: ${lines / (timeTotal / maxTests)}`);
        clearInterval(interval);
    }
}

const sendLog = async (level, msg) => {
    const response = await fetch("http://localhost:3000/log", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ level, msg })
    });
    return response;
}

const interval = setInterval(testFunction, 2000);