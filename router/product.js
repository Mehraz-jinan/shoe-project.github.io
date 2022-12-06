const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
// router.get('/', (req, res, next) => {
//   res.render('../views/landing-page/index.ejs', {
//             title: 'Home - page',
//   });
//     next();
// });
router.get('/product-showcase', async(req, res, next) => {
    const products = await Product.find();
    res.render('../views/products/product.ejs', {products , title: 'Product - page'});
    next();
});
router.get('/product-view/:id', async(req, res, next) => {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    console.log(findProduct);
    res.render('products/product-details.ejs', {
        title: 'product show - page',
        findProduct
    })
    
    next();
});
router.get('/checkout', (req, res, next) => {
        res.render('products/checkout.ejs', {
            title: "Checkout Product"
        });
    next();
});
router.get('/wishlist', (req, res, next) => { 
        res.render('../views/products/wishlist.ejs', {
            title: "Product You Love - Wishlist"
        })
    next();
});


router.get('/dashboard', (req, res, next) => {
    res.render('../views/dashboard/dashboard.ejs', {
        title: 'Seller - Dashboard',
    });
    next();
});
router.post('/add', async(req, res, next) => {
    const newProduct = new Product(req.body);
    console.log(newProduct)
    await newProduct.save();
    res.redirect(`/product/product-view/${newProduct._id}`);
    console.log('successful');
    next()
});
module.exports = router;