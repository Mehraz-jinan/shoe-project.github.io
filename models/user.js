const mongoose = require('mongoose');
const { Schema } = mongoose;
const Cart = require('./addtocart');
const Product = require('./productModel');
const Review = require('./review');
const Subreview = require('./sub-review');
const passportLocalMongoose = require('passport-local-mongoose');
const newUserSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String,
    },
    contact: {
        type: Number,
    },
    password: {
        type: String,
    },
    auth: {
        type: String,
    },
    product: [
        {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        }
    ],
    addtocart: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Cart',
        }
    ],
    wishlist: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
        }
    ],
});
newUserSchema.plugin(passportLocalMongoose, {
    usernameUnique: false,
});
const User = mongoose.model('User', newUserSchema);

module.exports = User;