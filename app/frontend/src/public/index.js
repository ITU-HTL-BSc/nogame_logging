const id = crypto.randomUUID();

const lines = 10000;

const testFunction = async () => {
    const time_start = performance.now();
    for (let i = 0; i < lines; i++) {
        await sendLog("info", `${performance.now()} - ${i}`);
    }
    const time_end = performance.now();

    const timeTotal = time_end - time_start;

    await fetch(
        `http://localhost:3000/metric?exec_time=${timeTotal}&lines_per_sec=${
            lines / timeTotal
        }`,
        {
            method: "POST",
            mode: "cors",
        }
    );
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
