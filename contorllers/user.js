const Product = require('../models/productModel');
const User = require('../models/user');
const Cart = require('../models/addtocart');
const Review = require('../models/review');
const Subreview = require('../models/sub-review');
const data = module.exports;

module.exports.profile = async (req, res, next) => {
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
};
module.exports.setprofile = async (req, res, next) => {
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
};
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
        }, { runValidators: true, new: true });
        req.flash('success', 'Updated Successfully');
        res.redirect(`/user/${findUser.username}`);
        
        
    }
    catch (err) {
        req.flash('error', `Something Went Wrong ${err.message}`);
        res.redirect(`/user/req.user.username`)
    }
};