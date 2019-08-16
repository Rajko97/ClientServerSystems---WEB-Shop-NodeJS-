const fs = require('fs');
const menuModel = require('../model/menu');
const menuData = './sources/menu.json';

menuModel.collection.drop();

async function insertData() {
    try {
        await insertMenu();
    } catch (error) {
        console.log("Error inserting data in menu: "+error);
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

module.exports = insertData();