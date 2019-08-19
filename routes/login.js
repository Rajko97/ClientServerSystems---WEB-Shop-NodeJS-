const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const constants = require('./../constants');

router.get("/", (req, res) => {
  res.send(`
    <h1>Uloguj se</h1>
    <form method='post' action='/login'>
      <input type='text' name='username' placeholder='Username' required/>
      <input type='password' name='password' placeholder='Password' required/>
      <input type='submit'/>
    </form>
  `);
});

router.post("/", (req, res) => {
    const {tableID, username, password} = req.body;

    if(tableID != null && username == null) {
      //login from mobile device
      if(password === constants.clientLoginPassword) {
        let token = jwt.sign({tableID: tableID}, constants.jwt_secret);
        return res.send({token: token});
      }
    } else if(tableID == null && username != null) {
      //login from worker site
      if(username === constants.workerLoginUsername && password === constants.workerLoginPassword) {
        req.session.userType = 'worker'; 
        return res.redirect('/');
      } else {
        return res.redirect('/login');
      }
    }
    res.sendStatus(400);
});

module.exports = router;