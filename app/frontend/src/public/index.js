const lines = 10000;

const testFunction = async () => {
    const time_start = performance.now();
    for (let i = 0; i < lines; i++) {
        await sendLog("info", `${i}`);
    }
    const time_end = performance.now();

    const time_total = time_end - time_start;

    await axios.post(`http://localhost:3000/metric?exec_time=${time_total}`);
};

const sendLog = async (level, msg) => {
    const response = await axios.post("http://localhost:3000/log", {
        level,
        msg,
    });
    return response;
};

(async () => {
    for (let i = 0; i < 20; i++) {
        await testFunction();
        document.getElementById("counter").innerHTML = ` ${i + 1}`;
    }
})();
