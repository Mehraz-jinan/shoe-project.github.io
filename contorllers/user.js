const Product = require('../models/productModel');
const User = require('../models/user');
const Cart = require('../models/addtocart');
const Review = require('../models/review');
const Subreview = require('../models/sub-review');
const { storage } = require('../cloudinary/index');
const { cloudinary } = require('../cloudinary/index');
const { urlencoded } = require('express');
module.exports.userprofile = async (req, res, next) => {
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
};
module.exports.profileEditRender = async (req, res, next) => {
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
};
module.exports.userProfileEdit = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findUser = await User.findByIdAndUpdate(id, {
            profilePic: req.body.profilePic,
            contact: req.body.contact,
            address: req.body.address,
        },
            {
                runValidators: true,
                new: true
            });
        if (req.file && req.file !== undefined) {
           await cloudinary.uploader.destroy(req.body.deleteimage);
            findUser.profilePic.url = req.file.path;
            findUser.profilePic.filename = req.file.filename;
            await findUser.save();
        }
       
        
        
        req.flash('success', 'Updated Successfully');
        res.redirect(`/user/${findUser.username}`);
    }
    catch (err) {
        req.flash('error', `Something Went Wrong ${err.message}`);
        res.redirect(`/user/${req.user.username}`)
    }
};