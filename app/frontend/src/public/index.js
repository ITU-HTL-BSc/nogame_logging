const id = crypto.randomUUID();

const lines = 10000;

const testFunction = async () => {
    const time_start = performance.now();
    await sendLog("info", time_start);
    for (let i = 1; i < lines - 1; i++) {
        await sendLog("info", `${performance.now()} - ${i}`);
    }
    const time_end = performance.now();
    await sendLog("info", time_end);

    const timeTotal = time_end - time_start;

    sendLog("info", `Execution Time: ${timeTotal} ms`);
    sendLog("info", `Lines/ms: ${lines / timeTotal}`);
}

const sendLog = async (level, msg) => {
    try {
        const response = await axios.post("http://localhost:3000/log", {
            level,
            id: id,
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

testFunction();