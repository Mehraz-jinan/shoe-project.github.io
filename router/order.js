const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel.js');
const User = require('../models/user');
const Cart = require('../models/addtocart');
const {isLoggedIn} = require('../middleware');
const {isAuthor} = require('../middleware');

router.get('/', (req, res, next) => {
    res.render('../views/dashboard/order.ejs', {
        title: 'Incoming Order',
    })
})
router.get('/details', (req, res, next) => {
    res.render('../views/dashboard/order-details.ejs', {
        title: 'Oder-Processing',
    });
});

module.exports = router;