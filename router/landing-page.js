const express = require('express');
const router = express.Router({
    mergeParams: true,
});
const Product = require('../models/productModel');

router.get('/', async(req, res, next) => {
    const productConfig = await Product.find();
    const lastProduct = productConfig[productConfig.length - 1];
    const secondLast = productConfig[productConfig.length - 2];
    const thirdLast = productConfig[productConfig.length - 3];

    console.log(lastProduct);
    console.log(secondLast);
    console.log(thirdLast);
    
    
    
    res.render('../views/landing-page/index.ejs', {
        title: process.env.PAGENAME,
        lastProduct,
        secondLast,
        thirdLast,
    });
    next();
});
module.exports = router;