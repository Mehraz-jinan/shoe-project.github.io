const express = require('express');
const session = require('express-session');
const router = express.Router();
const Product = require('../models/productModel');
const User = require('../models/user');
const Review = require('../models/review');
const { isLoggedIn } = require('../middleware');
const { isAuthor } = require('../middleware');
const { populate } = require('../models/review');
const Subreview = require('../models/sub-review');
const Cart = require('../models/addtocart');

const productSize = [];



router.get('/product-showcase', async(req, res, next) => {
    const products = await Product.find();
    res.render('../views/products/product.ejs', { products, title: 'Product - page' });

    next();
});
router.get('/product-view/:id', async(req, res, next) => {
    const { id } = req.params;
    const findProduct = await Product.findById(id).populate('creator').populate({
        path: 'review',
        populate: {
            path: 'reviewOwner',
           
        },
        
        
    }).populate({
        path: 'review',
        populate: {
            path: 'subReview',
            populate: {
                path: 'userId',
            }
        }
    });
    res.render('products/product-details.ejs', {
        title: 'product show - page',
        findProduct,
    });
    next();
    
});
router.get('/wishlist/:id', isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params;
        const wishUser = await User.findById(id).populate('wishlist');
        res.render('../views/products/wishlist.ejs', {
            title: "Product You Love - Wishlist",
            wishUser,
        });
        next();
    }
    catch (err) {
        req.flash('error', err.message);
        res.redirect('/');
    }
});
router.post('/wishlist/:id', isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params;
        const user_id = req.user._id;
        const findUser = await User.findById(user_id);
        const findCartProduct = await Product.findById(id);
        const addToCart = findUser.wishlist.push(findCartProduct);
        await findUser.save();
        req.flash('success', 'Product Added To Your Wishlist');
        res.redirect(`/product/wishlist/${findUser._id}`);
        next();
    }
    catch (err) {
        req.flash('error', err.message);
        res.redirect('/product/product-showcase');
    }
    

});
router.get('/checkout', isLoggedIn, async(req, res, next) => {
    const findUser = await User.findById(req.user._id).populate({
        path: 'addtocart',
        populate: {
            path: 'productInfo'
        }
    });
    const totalQuantity = [];
    for (let sum of findUser.addtocart) {
        const findQuantity = sum.productQuantity;
        const pushing = totalQuantity.push(findQuantity);
    }
    for (let i = 0; i < totalQuantity.length; i++){
        const afterQuantity = i + totalQuantity[i];
        console.log(afterQuantity)
    }

    
    
    res.render('../views/products/checkout.ejs', {
        findUser,
        title: 'Cart-part'
    })
});
router.post('/checkout/:id', isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params;
        const findProduct = await Product.findById(id);
        const newCart = new Cart(req.body);
        newCart.productInfo = findProduct;
        await newCart.save();
        const userId = req.user._id;
        const findUser = await User.findById(userId);
        findUser.addtocart.push(newCart);
        await findUser.save();
        req.flash('success', 'Successfully Added To Cart');
        res.redirect(`/product/checkout/`);
    }
    catch (err) {
        req.flash('error', err.message);
        res.redirect('/product/product-showcase');
    }
    

})

router.get('/dashboard', isLoggedIn , isAuthor , (req, res, next) => {
    res.render('../views/dashboard/dashboard.ejs', {
        title: 'Seller - Dashboard',
    });
    next();
});
router.post('/:id/add', isLoggedIn , isAuthor ,  async (req, res, next) => {
    const { id } = req.params;
    const findAuthor = await User.findById(id);
    const content = req.body;
    if (!content.productImage || !content.productName || !content.productDescription || !content.productPrice || !content.productAvaility || !content.productSize) {
        req.flash('error', 'Please Insert Everything');
        return res.redirect('/product/dashboard');
    } else {
        const newProduct = new Product(content);
    const addProduct = findAuthor.product.push(newProduct);
    const addCreator = newProduct.creator.push(findAuthor);
    findAuthor.save();
    newProduct.save();
    req.flash('success', `Successfully Create A New Product ${findAuthor.username}`);
    res.redirect(`/product/product-view/${newProduct._id}`);
    }
    
});
router.get('/:id/edit', isLoggedIn , isAuthor ,  async (req, res, next) => {
    const { id } = req.params;
    const findEdit = await Product.findById(id);
    res.render('products/productedit.ejs', {
        title: `${findEdit.productName} - Edit`,
        findEdit
    });
})
router.put('/:id/edit', isLoggedIn , isAuthor ,  async (req, res, next) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    req.flash('success', `Updated Successfully`);
    res.redirect(`/product/product-view/${updatedProduct._id}`);
});
router.delete('/delete/:id', isLoggedIn , isAuthor , async (req, res, next) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    req.flash('success', 'Deleted Successfully');
    res.redirect('/product/product-showcase');
})

module.exports = router;