const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const constants = require('./../constants');

router.post("/", (req, res) => {
    const {tableID, password} = req.body;

    if(tableID != null  && password == constants.clientLoginPassword) {
        let token = jwt.sign({tableID: tableID}, constants.jwt_secret);
        res.send({token: token});
      } else {
        res.sendStatus(400);
      }
});

module.exports = router;