const Product = require('../models/productModel');
const User = require('../models/user');
const Cart = require('../models/addtocart');
const Review = require('../models/review');
const Subreview = require('../models/sub-review');

module.exports.showProducts = async (req, res, next) => {
    const products = await Product.find();
    res.render('../views/products/product.ejs', { products, title: 'Product - page' });

    next();
};
module.exports.viewIndividualProduct = async (req, res, next) => {
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
    }).populate({
        path: 'addtocart',
        populate: {
            path: 'productInfo',
        },
    });
    res.render('products/product-details.ejs', {
        title: 'product show - page',
        findProduct,
    });
    next();
    
};
module.exports.wishlistView = async (req, res, next) => {
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
};
module.exports.saveToWishlist = async (req, res, next) => {
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
    

};
module.exports.renderCheckout = async (req, res, next) => {
    const findUser = await User.findById(req.user._id).populate({
        path: 'addtocart',
        populate: {
            path: 'productInfo'
        }
    });
    res.render('../views/products/checkout.ejs', {
        findUser,
        title: 'Cart-part'
    })
};
module.exports.saveToCheckout = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findProduct = await Product.findById(id);
        const newCart = new Cart(req.body);
        newCart.productInfo = findProduct;
        await newCart.save();
        findProduct.addtocart = newCart;
        const userId = req.user._id;
        const findUser = await User.findById(userId);
        findUser.addtocart.push(newCart);
        await findUser.save();
        await findProduct.save();
        req.flash('success', 'Successfully Added To Cart');
        res.redirect(`/product/checkout/`);
    }
    catch (err) {
        req.flash('error', err.message);
        res.redirect('/product/product-showcase');
    }
    

};
module.exports.renderDashboard = (req, res, next) => {
    res.render('../views/dashboard/dashboard.ejs', {
        title: 'Seller - Dashboard',
    });
    next();
};
module.exports.createProduct = async (req, res, next) => {
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
    
};
module.exports.renderProductEditForm = async (req, res, next) => {
    const { id } = req.params;
    const findEdit = await Product.findById(id);
    res.render('products/productedit.ejs', {
        title: `${findEdit.productName} - Edit`,
        findEdit
    });
};
module.exports.productEdit = async (req, res, next) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    req.flash('success', `Updated Successfully`);
    res.redirect(`/product/product-view/${updatedProduct._id}`);
};
module.exports.productDelete = async (req, res, next) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    req.flash('success', 'Deleted Successfully');
    res.redirect('/product/product-showcase');
}