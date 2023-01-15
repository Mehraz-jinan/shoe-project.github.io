const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/productModel');
const session = require('express-session');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');
const { isAuthor } = require('../middleware');


router.get('/', (req, res, next) => {
    res.render('../views/authenticaion/login.ejs', {
        title: "Authentication - page"
    });
});
router.get('/authmaker' , isLoggedIn , isAuthor ,  (req, res, next) => {
    res.render('../views/dashboard/authmaker.ejs', {
        title: 'Create Author',
    });
});
router.post('/register', async (req, res, next) => {
    try {
            const { username, email, contact, password } = req.body;
        if (!req.body.email) {
            req.flash('error', 'Inser Everything Carefully!');
            res.redirect('/auth');
        }
        else if (!req.body.contact) {
            req.flash('error', 'Insert Everything Carefully!');
            res.redirect('/auth');
        } else {
            const user = new User({ username, email, contact });
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, (err) => {
                if (err) {
                  return next(err);
                } else {
                    
            req.flash('success', `Set your profile ${req.user.username} to move forward`);
            res.redirect(`/user/setprofile/${req.user._id}`);
            next();
                }
            })
            
        }
        }
    catch (err) {
        req.flash('error', err.message);
        res.redirect('/auth');
        next();
    }
    
})
router.post('/author', async(req, res, next) => {
    try {
        const { username, email, contact, password, auth } = req.body;
        if (!req.body.username || !req.body.email || !req.body.contact || !req.body.password || !req.body.auth) {
            req.flash('error', 'Something Went Wrong!');
            res.redirect('/auth/authmaker')
        } else {
            const newAuthor = new User({
                username, email, contact, auth
            });
            const newRole = await User.register(newAuthor , password);
            req.flash('success', 'You create a new author to manage this site');
            res.redirect('/');
            next()
        }
    }
    catch (err) {
        req.flash('error', err.message);
        res.redirect('/auth/authmaker');
        next();
    }
})
router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/auth',
}), (req, res) => {
    req.flash('success', `Hello, Welcome Back! ${req.user.username}`);
    const redirectTo = req.session.returnTo || '/';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
});
router.get('/logout', (req, res, next) => {
    req.logout(req.user, (err) => {
        if (err) {
            return next(err);
        } else {
            req.flash('success', `Succefully Logout!Come Back Soon`);
    res.redirect('/'); 
    next();
        }
    });
    
})


module.exports = router;