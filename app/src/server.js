const express = require('express');
const pino = require('pino');
const pinoHttpSend = require('pino-http-send');

const app = express();
const logger = pino({ level: 'info' });

app.use(express.json());

app.post('/log', pinoHttpSend(logger));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});