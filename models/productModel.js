const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const Review = require('./review');
const Subreview = require('./sub-review');
const Cart = require('./addtocart');
const imageSchema = new Schema({
    url: String,
    filename: String,
});
imageSchema.virtual('thumbnail').get(function () {
   return this.url.replace('/upload' , '/upload/w_200')
})
const newProductSchema = new Schema({
    productImage: [imageSchema],
    productName: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    productPrice: {
        type: Number,
    },
    productAvaility: {
        type: String,
        enum: ['In Stock' , 'Out Of Stock'],
    },
    productSize:
        {
            type: Array,
            
        }
    ,
    productColor: 
    {
            type: Array,
        },
    category: {
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
    addtocart: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Cart',
        }
    ],
    
    
});
newProductSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.review,
            }
        });
        await Subreview.deleteMany({
            _id: {
                $in: doc.subReview,
            }
        });
        await Cart.deleteMany({
            _id: {
                $in: doc.addtocart,
            }
        })
    }
});
const Product = mongoose.model('Product', newProductSchema);

module.exports = Product;