const express = require('express');
const route = express.Router();

route.get('/checkout', (req, res, next) => {
    try {
        res.render('products/checkout.ejs', {
            title: "Checkout Product"
        });
        next();
    }
    catch (err) {
        res.send(err.message);
    }
});
module.exports = route;