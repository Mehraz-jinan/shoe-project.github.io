const mongoose = require('mongoose');
const { Schema } = mongoose;
const Product = require('./productModel');
const User = require('./user');

const newCartSchema = new Schema({
    productQuantity: {
        type: Number,
    },
    cartProductColor: {
        type: String,
    },
    cartProductSize: {
        type: String,
    },
    productInfo: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    },
    
})
const Cart = mongoose.model('Cart', newCartSchema);
module.exports = Cart;