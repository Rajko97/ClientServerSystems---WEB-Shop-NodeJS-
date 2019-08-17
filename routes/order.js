const express = require('express');
const router = express.Router();
const ordersModel = require('../model/orders');


router.post("/", (req, res) => {
    const {tableId, orders} = req.body;
    const postedAt = Date.now();
    ordersModel.collection.insertOne({tableId, postedAt, orders});
    res.send('done');
});

module.exports = router;