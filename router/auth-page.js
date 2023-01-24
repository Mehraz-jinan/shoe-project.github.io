const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/productModel');
const session = require('express-session');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');
const { isAuthor } = require('../middleware');
const authController = require('../contorllers/authpage');


router.get('/',
    authController.renderingAuth
);
router.get('/authmaker',
    isLoggedIn,
    isAuthor,
    authController.createAuthorRendering
);
router.post('/register',
    authController.registerUser
)
router.post('/author',
    authController.createAuthor
)
router.post('/login',
    passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/auth',
}), 
    authController.loginFunctionality
);
router.get('/logout',
    authController.logoutFunctionality
)


module.exports = router;