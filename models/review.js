const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const Product = require('./productModel');
const Subreview = require('./sub-review');
const newReviewSchema = new Schema({
    review: {
        type: String,
    },
    rating: {
        type: String,
    },
    reviewOwner:
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
    },
    subReview: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Subreview',
        }
    ],


});
newReviewSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Subreview.deleteMany({
            _id: {
                $in: doc.subReview,
            }
        });
    }
});
const Review = mongoose.model('Review', newReviewSchema);

module.exports = Review;