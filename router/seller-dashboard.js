const express = require('express');
const route = express.Router();

route.get('/dashboard', (req, res, next) => {
    try {
        res.render('../views/dashboard/dashboard.ejs', {
            title: 'Seller - Dashboard',
        })
        next();
    }
    catch (err) {
        next(err);
    }
});
module.exports = route;