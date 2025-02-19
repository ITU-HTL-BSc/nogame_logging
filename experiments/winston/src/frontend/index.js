function sendLog(message) {
  fetch("http://localhost:3000/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
}

while (true) {
  sendLog("hej daniel");
}
