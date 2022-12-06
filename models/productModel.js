const mongoose = require('mongoose');
const newProductSchema = new mongoose.Schema({
    productImage: {
        type: String
    },
    productName: {
        type: String
    },
    productDescription: {
        type: String
    },
    productPrice: {
        type: Number
    },
    productAvaility: {
        type: String
    },
    productSize: {
        type: String
    },
});
const Product = mongoose.model('Product', newProductSchema);
module.exports = Product;