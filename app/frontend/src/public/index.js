const duration = 30000; // 30 seconds in milliseconds

const testFunction = async () => {
    const time_start = performance.now();
    let total_lines = 0;

    while (performance.now() - time_start < duration) {
        console.log(`${iterations}`);
        iterations++;
    }

    await fetch(`http://localhost:3000/metric?total_lines=${total_lines}`, {
        method: "POST",
        mode: "cors",
    });
};

(async () => {
    for (let i = 0; i < 20; i++) {
        await testFunction();
        document.getElementById("counter").innerHTML = ` ${i}`;
    }
})();
