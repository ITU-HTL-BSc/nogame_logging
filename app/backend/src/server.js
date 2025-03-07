const express = require("express");
const cors = require("cors");
const logger = require("./logger");
const levelMap = {
    1000: 'trace',    
    2000: 'debug',    
    3000: 'info',   
    4000: 'warn',     
    5000: 'error',    
    6000: 'fatal',    
};

const app = express();

app.use(cors());
app.use(express.json());

app.get("/healthCheck", (_, res) => {
    res.status(200).send({ status: "OK" });
}); 

app.post("/log", (req, res) => {
    const { lg: logs = [] } = req.body

    logs.forEach(log => {
        const level = levelMap[log.l];
        const id = log.n;
        const msg = log.m;
        
        logger[level]({ id }, msg);
    });
    res.sendStatus(200);
});

const PORT = 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
