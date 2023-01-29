const Product = require('../models/productModel');
const User = require('../models/user');
const Cart = require('../models/addtocart');
const Review = require('../models/review');
const Subreview = require('../models/sub-review');
const { find } = require('../models/addtocart');
let categories = ["cloths","shoes","women's Cloth","jacket","kids","men Watch","womens's Watch"];

module.exports.showProducts = async (req, res, next) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({
            category
        })
        res.render('../views/products/product.ejs', {
            products, title: `${category} - page`,
            category,
        });
    } else {
        const products = await Product.find({});
        res.render('../views/products/product.ejs', {
            products, title: 'Product - page',
            category: 'All Products'
        });
    }

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
module.exports.deleteFromWishlist = async (req, res, next) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                wishlist: id,
            }
        });
        req.flash('success', 'Wishlist deleted Successfully');
        res.redirect(`/product/wishlist/${req.user._id}`);
    } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/product/wishlist/${req.user._id}`);
    }
}
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
        const newCart = new Cart({
            productQuantity: req.body.productQuantity,
            cartProductColor: req.body.cartProductColor,
            cartProductSize: req.body.cartProductSize,
        });
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
module.exports.deleteFromCheckout = async (req, res, next) => {
    try {
        const { cart_id, id } = req.params;
        await Product.findByIdAndUpdate(id, {
            $pull: {
                addtocart: cart_id,
            }
        });
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                addtocart: cart_id,
            }
        });
        const findCartToDelete = await Cart.findByIdAndDelete(cart_id);
        req.flash('success', 'Cart Deleted Successfully');
        res.redirect('/product/checkout');

    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/product/checkout')
    }
    next();
};
module.exports.renderDashboard = (req, res, next) => {
    res.render('../views/dashboard/dashboard.ejs', {
        title: 'Seller - Dashboard',
        categories,
    });
    next();
};
module.exports.createProduct = async (req, res, next) => {
    const { id } = req.params;
    const findAuthor = await User.findById(id);
    const content = req.body;
    if (!content.productImage || !content.productName || !content.productDescription || !content.productPrice || !content.productAvaility || !content.productSize || !content.productColor || !content.category) {
        req.flash('error', 'Please Insert Everything');
        return res.redirect('/product/dashboard');
    } else {
        const newProduct = new Product({
            productImage: content.productImage,
            productName: content.productName,
            productDescription: content.productDescription,
            productPrice: content.productPrice,
            productAvaility: content.productAvaility,
        });
       
        if (content.newCategory) {
                const addToCategory = categories.unshift(content.newCategory);
            newProduct.category = content.newCategory
        } else {
            newProduct.category = content.category
        };
        const size = content.productSize;
        const spliteSize = size.split(',');
        newProduct.productSize = spliteSize;
        const colors = content.productColor;
        const spliteColor = colors.split(',');
        newProduct.productColor = spliteColor;
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
    const content = req.body;
    const size = content.productSize;
    const sizeSplit = size.split(',');
    const colors = content.productColor;
    const colorSplit = colors.split(',');
    if (content.productImage && content.productName && content.productDescription && content.productPrice && content.productAvaility && content.productSize){
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            productImage: content.productImage,
            productName: content.productName,
            productDescription: content.productDescription,
            productPrice: content.productPrice,
            productAvaility: content.productAvaility,
            productSize: sizeSplit,
            productColor: colorSplit,
        },

            {
                runValidators: true,
                new: true
            });
        
        if (updatedProduct.productAvaility === 'Out Of Stock') {
            req.flash('success', 'You unlist the product');
            res.redirect(`/product/unlisted/${id}`);
        } else {
            req.flash('success', `Updated Successfully`);
            console.log(updatedProduct);
            res.redirect(`/product/product-view/${updatedProduct._id}`);
        }
    } else {
        req.flash('error', 'You missed something to insert');
        res.redirect(`/product/${id}/edit`);
    }
};
module.exports.renderingOutOfStockProduct = async (req, res, next) => {
    const findProduct = await Product.find({
        productAvaility: 'Out Of Stock'
    });
    res.render('../views/dashboard/outofstock.ejs', {
        title: 'Unlisted Products',
        findProduct,
    })
};
module.exports.viewOutOfStockProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findProduct = await Product.findById(id);
        res.render('../views/dashboard/outofstockdetails.ejs', {
            title: `${findProduct.productName} - views`,
            findProduct,
        }
        );
    } catch (error) {
        req.flash('error', `Something Went Wrong ${error.message}`);
        res.redirect(`/product/uslisted/${id}`);
    }
};
module.exports.activeProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndUpdate(id, {
            productAvaility: 'In Stock',
        },
            {
                runValidators: true,
                new: true,
            });
        req.flash('success', 'Product Activated');
        res.redirect(`/product/product-view/${id}`);
        
    } catch (error) {
        req.flash('error', 'Something Went Wrong ${error.message}');
        res.redirect(`/product/unlisted/${id}`);
    }
    next()
};
module.exports.deleteFromOutOfStock = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product Deleted Successfully');
        res.redirect(`/product/unlisted`);
    } catch (error) {
        req.flash('error', `Something Went Wrong`);
        res.redirect(`/product/product-showcase`);
    };
};

module.exports.productDelete = async (req, res, next) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    req.flash('success', 'Deleted Successfully');
    res.redirect('/product/product-showcase');
}