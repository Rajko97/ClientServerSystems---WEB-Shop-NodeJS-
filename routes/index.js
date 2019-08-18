const express = require('express');
const router = express.Router();
const ordersModel = require('../model/orders');
const menuModel = require('../model/menu');

router.get('/', function(req, res, next) {
  waitForDataBeingReady()
    .then(data => 
      res.send(data)
    );
});

function waitForDataBeingReady() {
  return new Promise((res, rej) => {
    ordersModel.find(async (err, docs) => {
      const result = [];
      for (const item of docs) {
        result.push(await createReformatedOrder(JSON.parse(JSON.stringify(item))));  
      }
      res(result);    
    });
  });
}

async function createReformatedOrder(clientOrder) {
  const postedAt = clientOrder['posted'];
  const tableId = clientOrder['tableId'];
  const formatedOrders = [];
  
  for (const order of clientOrder.orders) {
      const formatedOrder = await getNamePriceFromID(order['_id']);
      formatedOrder['count'] = order['count'];
      formatedOrders.push(formatedOrder);
  }
  return {postedAt: postedAt, tableId: tableId, orders: formatedOrders}
}

function getNamePriceFromID(orderId) {
  return new Promise((res, rej) => {
    menuModel.findById(orderId, (err, doc) => {
      res({name: doc.name, price: doc.price});
    });
  });
}

module.exports = router;