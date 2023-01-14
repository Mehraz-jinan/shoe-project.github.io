const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const User = require('../models/user');
const Cart = require('../models/addtocart');
const { isLoggedin } = require('../middleware');
const { isAuthor } = require('../middleware');
const { route } = require('./product');
const { update } = require('../models/addtocart');


router.get('/:userName', async (req, res, next) => {
    try {
        const { userName } = req.params;
        const findUser = await User.findById(req.user._id);
        res.render('../views/dashboard/userprofile.ejs', {
            title: `Welcome - ${userName}`,
            findUser
        })
    }
    catch (err) {
        req.flash('error', `Something Went Wrong ${err.message}`);
        res.redirect('/');
    }
});
router.get('/info/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const findUser = await User.findById(id);
        res.render('../views/dashboard/userinfo.ejs', {
            title: `${findUser.username}- Edit Information`,
            findUser,
        })
    }
    catch (err) {
        req.flash('error', `Something Went Wrong ${err.message}`);
        res.redirect('/');
    }
});
router.put('/info/:id/edit', async (req, res, next) => {
    try {
       
    }
    catch (err) {
        req.flash('error', 'something Went Wrong');
        res.redirect(`/user/${updateInfo.username}`)
    }
})
module.exports = router;