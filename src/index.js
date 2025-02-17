function logKeyEvent(eventType, key) {
  fetch("http://localhost:3000/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: `${eventType}: ${key}` }),
  }).catch((err) => console.error("Logging error:", err));
}

var counter = 0;

setInterval(() => {
  logKeyEvent("Test at 1ms: " + counter);
  counter++;
}, 1);

document.addEventListener("keydown", (e) => logKeyEvent("Key pressed", e.key));
document.addEventListener("keyup", (e) => logKeyEvent("Key released", e.key));
