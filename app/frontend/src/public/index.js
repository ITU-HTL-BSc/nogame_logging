const lines = 1000;
const maxTests = 10;
let timeTotal = 0;
let countTests = 0;

const testFunction = () => {
    const time_start = performance.now();
    console.log(time_start);
    for (let i = 1; i < lines-1; i++) {
        console.log(`${performance.now()} - ${i}`);
    }
    const time_end = performance.now();
    console.log(time_end);

    countTests++;
    timeTotal += time_end - time_start;
    if (countTests >= maxTests) {
        console.log(`Execution Time: ${timeTotal} ms`);
        console.log(`Average Time: ${timeTotal / maxTests} ms`);
        console.log(`Lines/ms: ${lines / (timeTotal / maxTests)}`);
        clearInterval(interval);
    }
}

const interval = setInterval(testFunction, 2000);