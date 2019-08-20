const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const constants = require('./../constants');

router.get('/', (req, res) => {
  res.render('login', {title: 'Prijavi se', message: req.session.errorMessage});
  req.session.errorMessage = null;
});

router.post('/', (req, res) => {
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
        req.session.errorMessage = 'Greška! Korisničko ime i lozinka se ne podudaraju!';
        return res.redirect('/login');
      }
    }
    res.sendStatus(400);
});

module.exports = router;