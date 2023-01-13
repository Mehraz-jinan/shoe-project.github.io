const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const Review = require('./review');
const Subreview = require('./sub-review')
const newProductSchema = new Schema({
    productImage: {
        type: String,
    },
    productName: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    productPrice: {
        type: String,
    },
    productAvaility: {
        type: String,
    },
    productSize: 
        {
            type: String,
    },
   
    creator:
    [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            }
        ],
    review: [
        {
            type: mongoose.Types.ObjectId,
            ref : 'Review',
        }
    ],
    subReview: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Subreview',
        }
    ],
    
    
});
newProductSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.review,
            }
        })
    }
});
const Product = mongoose.model('Product', newProductSchema);

module.exports = Product;