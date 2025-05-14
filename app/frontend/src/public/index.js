const duration = 30000; // 30 seconds in milliseconds

const testFunction = async () => {
    const time_start = performance.now();
    let total_lines = 0;

    while (performance.now() - time_start < duration) {
        await sendLog("info", `${total_lines}`);
        total_lines++;
    }

    await fetch(`http://localhost:3000/metric?total_lines=${total_lines}`, {
        method: "POST",
        mode: "cors",
    });
};

const sendLog = async (level, msg) => {
    const response = await fetch("http://localhost:3000/log", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ level, msg }),
    });
    return response;
};

(async () => {
    for (let i = 0; i < 5; i++) {
        await testFunction();
        document.getElementById("counter").innerHTML = ` ${i + 1}`;
    }
})();
