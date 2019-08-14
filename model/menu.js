const mongoose = require('mongoose');

const menuObject = {
    category: {
        type: String,
        enum: ['hrana', 'pice', 'dezert']
    },
    name: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required: true
    },
    desc: {
        type:String,
        required:true
    }
}

const Menu = mongoose.model('menu', new mongoose.Schema(menuObject, {collection: 'menu'}));

module.exports=Menu;