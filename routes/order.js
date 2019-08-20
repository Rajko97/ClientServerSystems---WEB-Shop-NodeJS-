const express = require('express');
const router = express.Router();
const ordersModel = require('../model/orders');
const createReformatedOrder = require('../controller/createReformatedOrder');

router.post("/", (req, res) => {
    const io = require('../controller/socket').getio();

    const {tableId, orders} = req.body;
    const posted = Date.now();
    
    createReformatedOrder({tableId, orders, posted}).then((data) => {
        io.emit('orders', data);
        ordersModel.collection.insertOne({tableId, posted, orders});
        res.send('done');
    });
});

module.exports = router;