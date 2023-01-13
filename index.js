// external library required
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const engine = require('ejs-mate');
const path = require('path');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');
const { isLoggedIn } = require('./middleware');


//configuration of dotenv
dotenv.config();

//Router file requirement
const productRouter = require('./router/product');
const reviewRouter = require('./router/review');
const authRouter = require('./router/auth-page');
const landingPageRouter = require('./router/landing-page');
const orderRouter = require('./router/order');

// Model files included
const product = require('./models/productModel');
const User = require('./models/user');
const Review = require('./models/review');
const Subreview = require('./models/sub-review');
const Cart = require('./models/addtocart');
const { urlencoded } = require('express');

//rendering file setup
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.engine('ejs' , engine);

//static file setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({extended:true}))
//method override setup and mongoose setup
app.use(methodOverride('_method'));

// session configeration
const sessionConfig = {
    secret: 'keyboard cat',
    httpOnly: true,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000*60*60*24*7,
    }
}
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// flash configure
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.activeUser = req.user;
    next();
});

mongoose.connect(process.env.MONGOOSE)
.then(() => {
    console.log('Database Connected');
})
.catch((err) => {
    console.log(err);
    console.log('Database not Connected')
});

// Routing setup
app.use('/' , landingPageRouter);
app.use('/product', productRouter);
app.use('/auth', authRouter);
app.use('/', reviewRouter);
app.use('/order', orderRouter);


//port setup
app.listen(process.env.PORT , () => {
    console.log('connected to the port')
})


