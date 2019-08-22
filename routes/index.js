const express = require('express');
const router = express.Router();
const ordersModel = require('../model/orders');
const createReformatedOrder = require('../controller/createReformatedOrder');

router.get('/', function(req, res, next) {
  ordersModel.find(async (err, docs) => {
    const result = [];
    for (const item of docs) {
      result.push(await createReformatedOrder(JSON.parse(JSON.stringify(item))));  
    }
    res.render('index', {title: 'VTS Restaurant', data:result.reverse()});
  });
});

module.exports = router;