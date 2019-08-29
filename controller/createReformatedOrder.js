const menuModel = require("../model/menu");

async function createReformatedOrder(clientOrder) {
  return {
    _id: clientOrder['_id'],
    postedAt: clientOrder['posted'],
    tableId: clientOrder['tableId'],
    orders: await Promise.all(clientOrder['orders'].map(order => getNamePriceFromID(order['_id'], order['count'])))
  }
}

function getNamePriceFromID(orderId, count) {
  return new Promise((res, rej) => {
    menuModel.findById(orderId, (err, doc) => {
      res({count: count, name: doc.name, price: doc.price});
    });
  });
}

module.exports = createReformatedOrder;