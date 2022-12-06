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
const productRouter = require('./router/product');
const authRouter = require('./router/auth-page');
const landingPageRouter = require('./router/landing-page');


const product = require('./models/productModel');
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


//port setup
app.listen(process.env.PORT , () => {
    console.log('connected to the port')
})


