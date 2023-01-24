const express = require('express');
const router = express.Router({
    mergeParams: true,
});
const Product = require('../models/productModel');
const homeController = require('../contorllers/landingpage');

router.get('/',
    homeController.index
);
module.exports = router;