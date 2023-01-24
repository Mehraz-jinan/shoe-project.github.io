const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel.js');
const User = require('../models/user');
const Cart = require('../models/addtocart');
const {isLoggedIn} = require('../middleware');
const { isAuthor } = require('../middleware');
const orderController = require('../contorllers/orderprocessing');

router.get('/',
    orderController.incomingOrders
);
router.get('/details',
    orderController.pendingOrders
);
router.get('/confirm',
    orderController.confirmOrders
);

module.exports = router;