const express = require('express');
const router = express.Router();
const ordersModel = require('../model/orders');
const createReformatedOrder = require('../controller/createReformatedOrder');

router.post('/', async (req, res) => {
    const io = require('../controller/socket').getio();

    const {tableId, orders} = req.body;
    const posted = Date.now();
    
    const data = await createReformatedOrder({tableId, orders, posted})

    io.emit('orders', data);
    ordersModel.collection.insertOne({tableId, posted, orders});
    res.send('done');
});

module.exports = router;