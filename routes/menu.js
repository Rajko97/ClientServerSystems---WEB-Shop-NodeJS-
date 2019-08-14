var express = require('express');
var router = express.Router();

const Menu = require('../model/menu.js');

router.get('/', function(req, res, next) {
  Menu.find((err, docs) => {
    if(err) {
      return res.send(err);
    }
    return res.json(docs);
  });
});

module.exports = router;