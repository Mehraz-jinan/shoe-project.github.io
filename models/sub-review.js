const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const Product = require('./productModel');
const Review = require('./review');
const newReviewSchema = new Schema({
    subReview: {
        type: String,
    },
    reviewId : {
        type: mongoose.Types.ObjectId,
        ref: 'Review',
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    },
});
const Subreview = mongoose.model('Subreview', newReviewSchema);
module.exports = Subreview;