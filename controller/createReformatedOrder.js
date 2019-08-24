const menuModel = require("../model/menu");

async function createReformatedOrder(clientOrder) {
    const id = clientOrder['_id'];
    const postedAt = clientOrder['posted'];
    const tableId = clientOrder['tableId'];
    const formatedOrders = [];
    
    for (const order of clientOrder.orders) {
        const formatedOrder = await getNamePriceFromID(order['_id']);
        formatedOrder['count'] = order['count'];
        formatedOrders.push(formatedOrder);
    }
    return {_id: id, postedAt: postedAt, tableId: tableId, orders: formatedOrders}
  }
  
  function getNamePriceFromID(orderId) {
    return new Promise((res, rej) => {
      menuModel.findById(orderId, (err, doc) => {
        res({name: doc.name, price: doc.price});
      });
    });
  }
  
  module.exports = createReformatedOrder;