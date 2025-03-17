const id = crypto.randomUUID();

const lines = 10000;

const testFunction = async () => {
    const time_start = performance.now();
    for (let i = 0; i < lines; i++) {
        console.log(`${performance.now()} - ${i}`);
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

testFunction();
