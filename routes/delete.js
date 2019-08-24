const express = require('express');
const router = express.Router();
const ordersModel = require('../model/orders');

router.delete('/:id', (req, res) => {
    const io = require('../controller/socket').getio();
    const id = req.params.id;
    if(!id) {
        return res.status(400).send('err');
    }
    ordersModel.findByIdAndRemove(id, (err, doc) => {
        if(err || doc == null) {
            return res.send('err');
        }
        res.send('done');
    });
});

module.exports = router;