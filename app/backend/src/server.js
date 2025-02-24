const express = require("express");
const path = require("path");
const logger = require("./logger");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/log", (req, res) => {
  const { level, msg } = req.body;
  res.sendStatus(200);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
