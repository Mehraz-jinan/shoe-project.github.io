const express = require('express');
const route = express.Router();

route.get('/product-view', (req, res, next) => {
    try {
        res.render('products/product-details.ejs', {
            title: 'product show - page'
        })
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
    next();
});
module.exports = route;