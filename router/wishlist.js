const express = require('express');
const route = express.Router();

route.get('/wishlist', (req, res, next) => { 
    try {
        res.render('../views/products/wishlist.ejs', {
            title: "Product You Love - Wishlist"
        })
    }
    catch (err) {
        res.send(err.message);
    }
});
module.exports = route;