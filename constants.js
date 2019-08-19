const shouldFillDBWithData = true;
const dbPath = 'mongodb://localhost:27017/shopify2';

const jwt_secret = "HW4@sfT^75xcAHT12ZUHS"; 
const loginPasswordForClient = "vts2019";
const loginPasswordForWorker = "vts2019";
const loginUsernameForWorker = "radnik";

module.exports = {
    dbPath : dbPath,
    initalizeDB : shouldFillDBWithData,
    jwt_secret : jwt_secret,
    clientLoginPassword : loginPasswordForClient,
    workerLoginPassword : loginPasswordForWorker,
    workerLoginUsername : loginUsernameForWorker
};