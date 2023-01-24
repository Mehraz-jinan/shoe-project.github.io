const Product = require('../models/productModel');
const User = require('../models/user');
const Cart = require('../models/addtocart');
const Review = require('../models/review');
const Subreview = require('../models/sub-review');

module.exports.incomingOrders = (req, res, next) => {
    res.render('../views/dashboard/order.ejs', {
        title: 'Incoming Order',
    })
};
module.exports.pendingOrders = (req, res, next) => {
    res.render('../views/dashboard/order-details.ejs', {
        title: 'Oder-Processing',
    });
};
module.exports.confirmOrders = (req, res, next) => {
    res.render('../views/dashboard/confirm-order.ejs', {
        title: "Confirm Order  - list",
    })
};