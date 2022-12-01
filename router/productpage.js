const express = require('express');
const router = express.Router();

router.get('/product', (req, res, next) => {
    try {
        res.render('../views/products/product.ejs', {
            title: 'Product - page'
        });
    }
    catch (err) {
        res.send(err);
        next(err.message);
    }
});
module.exports = router;