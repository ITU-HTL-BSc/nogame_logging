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

    await sendLog("metric", `Execution Time: ${timeTotal} ms`);
    await sendLog("metric", `Lines/ms: ${lines / timeTotal}`);
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