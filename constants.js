const shouldFillDBWithData = true;
const dbPath = 'mongodb://localhost:27017/shop';
const jwt_secret = "HW4@sfT^75xcAHT12ZUHS"; 
const loginPasswordForClient = "vts2019";
const loginPasswordForWorker = "vts2019";
const loginUsernameForWorker = "radnik";
const port = '3000';

module.exports = {
    PORT : port,
    dbPath : dbPath,
    initalizeDB : shouldFillDBWithData,
    jwt_secret : jwt_secret,
    clientLoginPassword : loginPasswordForClient,
    workerLoginPassword : loginPasswordForWorker,
    workerLoginUsername : loginUsernameForWorker
};