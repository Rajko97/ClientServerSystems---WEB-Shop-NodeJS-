const express = require('express');
const router = express.Router();
const ordersModel = require('../model/orders');
const createReformatedOrder = require('../controller/createReformatedOrder');
const jwt = require('jsonwebtoken');
const constants = require('../constants');

router.post('/', async (req, res) => {
    const io = require('../controller/socket').getio();
    const token = req.headers.authorization.slice(7, req.headers.authorization.length).trimLeft();
    const decoded = jwt.verify(token, constants.jwt_secret);

    const tableId = decoded.tableID;
    const orders = req.body.orders;
    const posted = Date.now();
    const data = await createReformatedOrder({tableId, orders, posted})
    
    io.emit('orders', data);
    ordersModel.collection.insertOne({tableId, posted, orders});
    res.send('{"message":"done"}');
});

module.exports = router;