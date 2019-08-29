const express = require('express');
const router = express.Router();
const ordersModel = require('../model/orders');
const createReformatedOrder = require('../controller/createReformatedOrder');

router.get('/', function(req, res, next) {
  ordersModel.find(async (err, docs) => {
    res.render('index', {
      tite: 'VTS Restaurant',
      data: await Promise.all(docs.map(order => createReformatedOrder(JSON.parse(JSON.stringify(order)))).reverse())
    });
  });
});

module.exports = router;