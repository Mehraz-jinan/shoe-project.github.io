const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const User = require('../models/user');
const Cart = require('../models/addtocart');
const { isLoggedIn } = require('../middleware');
const { isAuthor } = require('../middleware');
const { update } = require('../models/addtocart');
const userController = require('../contorllers/user');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

router.get('/:userName',
    userController.userprofile
);

router.route('/info/:id/edit')
    .get(
        isLoggedIn,
        userController.profileEditRender
    )
    .put(
        isLoggedIn,
        upload.single('profilePic'),
        userController.userProfileEdit
    )


    

module.exports = router;