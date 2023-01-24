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
const userController = require('../contorllers/user');

router.route('/setprofile/:id')
    .get(
        userController.profile
    )
    .post(
        userController.setprofile
    );

router.get('/:userName',
    userController.userprofile
);

router.route('/info/:id/edit')
    .get(
        userController.profileEditRender
    )
    .put(
        userController.userProfileEdit
    )

module.exports = router;