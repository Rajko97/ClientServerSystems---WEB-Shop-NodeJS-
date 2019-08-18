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
    ordersModel.find((err, docs) => {
      res(waitForEachOrderInOrders(docs));
    });
  });
}

async function waitForEachOrderInOrders(docs) {
  let resault = [];
  for (let i in docs) {
    resault.push(await createReformatedOrder(JSON.parse(JSON.stringify(docs[i]))));  
  }
  return resault;
}

async function createReformatedOrder(clientOrder) {
  let postedAt = clientOrder.posted;
  let tableId = clientOrder.tableId;
  let formatedOrders = [];
  
  for (let i in clientOrder.orders) {
    try {
      let formatedOrder = await getNamePriceFromID(clientOrder.orders[i]._id);
      formatedOrder['count'] = clientOrder.orders[i]['count'];
      formatedOrders.push(formatedOrder);
    } catch (err) {
      //console.log(clientOrder);
    }
  }
  return {postedAt: postedAt, tableId: tableId, orders: formatedOrders}
}

function getNamePriceFromID(orderId) {
  return new Promise((res, rej) => {
    menuModel.findById(orderId, (err, doc) => {
      if (err || doc == null) {
        rej('Greska'); //todo WTF ovi null docs
      }
      else res({name: doc.name, price: doc.price});
    });
  });
}

module.exports = router;