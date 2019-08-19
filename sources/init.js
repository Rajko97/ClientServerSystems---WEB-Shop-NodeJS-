const fs = require('fs');
const menuModel = require('../model/menu');
const menuData = './sources/menu.json';
const ordersModel = require('../model/orders');

menuModel.collection.drop();
ordersModel.collection.drop();

async function insertData() {
    try {
        await insertMenu();
        await insertOrders();
    } catch (error) {
        console.log("Error inserting data: "+error);
    }
}

function insertMenu() {
  return new Promise((res, rej)=> {
    fs.readFile(menuData, 'utf-8', (err, data) => {
      if(err) {
        return rej('failed to load menu source file');
      }
      let doc = JSON.parse(data.toString());
      for(let x = 0; x < doc.length; x++) {
        menuModel.collection.insertOne(doc[x]);
      }
      res(true);
    });
  });
}

function insertOrders() {
  return new Promise((res, rej) => {
    menuModel.find({}, (err, docs) => {
      for (let i = 0; i < 5; i++) {
        let object = {};
        object['tableId'] = Math.floor(Math.random() * 10);
        object['orders'] = [];
        object['posted'] = Date.now(); //todo odraditi preko scheme-e
        for (let j = 0; j <= Math.floor(Math.random() * 2); j++) { 
          let element = {};
          element['_id'] = docs[Math.floor(Math.random() * docs.length)]['_id'];
          element['count'] = Math.floor(Math.random() * 3) +1;
          object['orders'].push(element);
        }                   
        ordersModel.collection.insertOne(object, {upsert:true, setDefaultsOnInsert: true});
      }
      res(true);
    });
  }); 
}

module.exports = insertData();