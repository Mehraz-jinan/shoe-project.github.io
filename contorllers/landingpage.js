const Product = require('../models/productModel');
const User = require('../models/user');

module.exports.index = async (req, res, next) => {
    const productConfig = await Product.find();
    const lastProduct = productConfig[productConfig.length - 1];
    const secondLast = productConfig[productConfig.length - 2];
    const thirdLast = productConfig[productConfig.length - 3];
    
    
    
    res.render('../views/landing-page/index.ejs', {
        title: process.env.PAGENAME,
        lastProduct,
        secondLast,
        thirdLast,
        productConfig,
    });
    next();
};