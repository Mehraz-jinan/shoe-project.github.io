// external library required
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const engine = require('ejs-mate');
const path = require('path');

//configuration of dotenv
dotenv.config();


//Router file requirement
const homeRouter = require('./router/homepage');
const authRouter = require('./router/auth-page');
const productRouter = require('./router/productpage');
const showRouter = require('./router/productdetail');
const checkoutRouter = require('./router/checkout');
const wishlistRouter = require('./router/wishlist');
const sellerRouter = require('./router/seller-dashboard');


//rendering file setup
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.engine('ejs' , engine);

//static file setup
app.use(express.static(path.join(__dirname , 'public')));

//method override setup
app.use(methodOverride('_method'));
mongoose.connect(process.env.MONGOOSE)
.then(() => {
    console.log('Database Connected');
})
.catch((err) => {
    console.log(err);
    console.log('Database not Connected')
});

// Routing setup
app.get('/' , homeRouter);
app.get('/auth', authRouter);
app.get('/product', productRouter);
app.get('/product-view', showRouter);
app.get('/checkout', checkoutRouter);
app.get('/wishlist', wishlistRouter);
app.get('/dashboard', sellerRouter);
//error setup
// app.use('*' , (err , req , res , next) => {
    
//     res.status
// })
//port setup
app.listen(process.env.PORT , () => {
    console.log('connected to the port')
})


