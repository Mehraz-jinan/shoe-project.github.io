const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const router = express.Router();
const Product = require('../models/productModel');
const Review = require('../models/review');
const User = require('../models/user');
const Subreview = require('../models/sub-review')
const { isLoggedIn } = require('../middleware');
const { isAuthor } = require('../middleware');
const reviewController = require('../contorllers/review-subreview');

// review Post Method
router.post('/product/product-view/:id/review/:user_id',
    isLoggedIn,
    reviewController.makeReview
);
// review delete request
router.delete('/product/product-view/:id/review/:reviewId',
    isLoggedIn,
    reviewController.deleteMainReview
);

// review edit method
router.get('/product/product-view/:productId/review/:id/edit',
    isLoggedIn,
    reviewController.editReviewRendering
)
router.put('/product/:product_id/review/:id/edit',
    isLoggedIn,
    reviewController.editReview
);


//  review comment route
router.post('/product/product-view/:id/review/:reviewId/comment',
    isLoggedIn,
    reviewController.makeSubReview
)

module.exports = router;