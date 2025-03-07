const Id = crypto.randomUUID();

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
        sendLog("info", `Execution Time: ${timeTotal} ms`);
        sendLog("info", `Average Time: ${timeTotal / maxTests} ms`);
        sendLog("info", `Lines/ms: ${lines / (timeTotal / maxTests)}`);
        clearInterval(interval);
    }
}

const sendLog = async (level, msg) => {
    try {
        const response = await axios.post("http://localhost:3000/log", {
            level,
            Id,
            msg
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (error) {
        console.error("Error sending log:", error);
    }
}

const interval = setInterval(testFunction, 2000);