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
const productController = require('../contorllers/products');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage})




router.route('/product-showcase')
    .get(
        productController.showProducts
    );
router.get('/product-view/:id',
    productController.viewIndividualProduct
);



// Wishlist Router
router.route('/wishlist/:id')
    .get(
        isLoggedIn,
        productController.wishlistView
    )
    .post(
        isLoggedIn,
        productController.saveToWishlist
    )
    .delete(isLoggedIn,
        productController.deleteFromWishlist
)
    
// Checkout Router
router.get('/checkout',
        isLoggedIn,
        productController.renderCheckout
    )
router.post('/checkout/:id',
        isLoggedIn,
        productController.saveToCheckout
);
router.delete('/checkout/:cart_id/:id',
    isLoggedIn,
    productController.deleteFromCheckout
);

router.get('/dashboard',
    isLoggedIn,
    isAuthor,
    productController.renderDashboard
);

router.get('/unlisted',
    isLoggedIn,
    isAuthor,
    productController.renderingOutOfStockProduct,
)
router.route('/unlisted/:id')
    .get(
    isLoggedIn,
    isAuthor,
    productController.viewOutOfStockProduct,
)
    .put(
        isLoggedIn,
        isAuthor,
        productController.activeProduct,
)
    .delete(
        isLoggedIn,
        isAuthor,
        productController.deleteFromOutOfStock,
    )
// Product add,edit,delete
router.post('/:id/add',
    isLoggedIn,
    isAuthor,
    upload.array('productImage'),
    productController.createProduct
   
);

router.route('/:id/edit')
    .get(
        isLoggedIn,
        isAuthor,
        productController.renderProductEditForm
    )
    .put(
        isLoggedIn,
        isAuthor,
        upload.array('productImage'),
        productController.productEdit
    );
router.delete('/delete/:id',
    isLoggedIn,
    isAuthor,
    productController.productDelete
)

module.exports = router;