const id = crypto.randomUUID();

const lines = 10000;

const testFunction = async () => {
    const time_start = performance.now();
    console.log(time_start);
    for (let i = 1; i < lines - 1; i++) {
        console.log(`${performance.now()} - ${i}`);
    }
    const time_end = performance.now();
    console.log(time_end);

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
