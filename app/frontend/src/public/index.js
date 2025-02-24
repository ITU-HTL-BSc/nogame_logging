// while (true) {
//     console.log(Date.now());
// }

// setInterval(() => {
//     console.log(Date.now());
// }, 1000);

lines = 10000;
time_start = Date.now();
for (let i = 0; i < lines; i++) {
    console.log(`${Date.now()} - ${i}`);
}
time_end = Date.now();
console.log(`Execution Time: ${time_end - time_start} ms`);
console.log(`Lines/ms: ${lines / (time_end - time_start)}`);