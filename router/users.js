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

router.get('/setprofile/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const findUser = await User.findById(id);
    
        res.render('../views/partial/justafterlogin.ejs', {
            title: `${req.user.username} - Set Profile`,
            findUser,
        });
    }
    catch (err) {
        req.flash('error', `Somethig Went Wrong ${err.message}`);
        res.redirect('/auth');
    }
})
router.post('/setprofile/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const findUser = await User.findById(id);
        if (!req.body.address) {
            req.flash('error', 'Set up your address to move');
            res.redirect(`/user/setprofile/${findUser._id}`)
        } else {
            findUser.profilePic = req.body.profilePic;
            findUser.address = req.body.address;
            await findUser.save();
            req.flash('success', 'Information added Successfully');
            res.redirect(`/user/${findUser.username}`)
        }
    }
    catch (err) {
        req.flash('error', 'something Went Wrong');
    }
})
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
router.put('/info/:id/edit', async(req, res, next) => {
    try {
        const { id } = req.params;
        const findUser = await User.findByIdAndUpdate(id,  {
            profilePic: req.body.profilePic,
            contact: req.body.contact,
            address: req.body.address,
        }, { runValidators: true, new: true });
        req.flash('success', 'Updated Successfully');
        res.redirect(`/user/${findUser.username}`);
        
    }
    catch (err) {
        req.flash('error', `Something Went Wrong ${err.message}`);
        res.redirect(`/user/req.user.username`)
    }
})

module.exports = router;