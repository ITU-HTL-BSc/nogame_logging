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

    await axios.post(`http://localhost:3000/metric`, {
        params: {
            exec_time: timeTotal,
            lines_per_sec: lines / timeTotal,
        },
    });
};

const sendLog = async (level, msg) => {
    const response = await axios.post("http://localhost:3000/log", {
        level,
        id,
        msg,
    });
    return response;
};

testFunction();
