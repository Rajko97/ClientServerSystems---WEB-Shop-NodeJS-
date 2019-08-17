const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required:true
    },
    count: {
        type: Number,
        min: 0,
        required:true
    }
});

const ordersObject = {
    tableID: {
        type: Number,
        min: 0,
        max: 10,
        required:true
    },
    posted: {
        type: Date,
        default: Date.now
    },
    orders: {
        type: [orderSchema],
        required: true
    }
}

const orders = mongoose.model('orders', new mongoose.Schema(ordersObject));

module.exports = orders;