const Product = require('../models/productModel');
const User = require('../models/user');
const Cart = require('../models/addtocart');
const Review = require('../models/review');
const Subreview = require('../models/sub-review');

module.exports.makeReview = async (req, res, next) => {
    const { id } = req.params;
    const { user_id } = req.params;
    const reviewContent = req.body;
    if (!reviewContent.review) {
        req.flash('error', 'You try to submit blank');
        res.redirect(`/product/product-view/${id}`)
    } else {
        const findProduct = await Product.findById(id);
        const findUser = await User.findById(user_id);
        const newReview = new Review(reviewContent);
        newReview.reviewOwner = findUser;
        const reviewToProduct = findProduct.review.push(newReview);
        await newReview.save();
        await findProduct.save();
        req.flash('success', 'Review Added Successfully');
        res.redirect(`/product/product-view/${findProduct._id}`)
    }
    next();

};
module.exports.deleteMainReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { review: reviewId } })
    const findReview = await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Your Review Deleted Successfully');
    res.redirect(`/product/product-view/${id}`);
};
module.exports.editReviewRendering = async (req, res, next) => {
    const { id, productId } = req.params;
    const findReviewProduct = await Product.findById(productId);
    const findReview = await Review.findById(id);
    res.render('../views/products/review-edit.ejs', {
        title: "Review - edit",
        findReview,
        findReviewProduct
    });
    next();
};
module.exports.editReview = async (req, res) => {
    const { id, product_id } = req.params;
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
    })
    req.flash('success', 'Review updated Successfully');
    res.redirect(`/product/product-view/${product_id}`)
};

module.exports.makeSubReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const findProduct = await Product.findById(id);
    const findReview = await Review.findById(reviewId);
    const findUser = await User.findById(req.user._id);
    const comment = req.body;
    if (!comment.subReview) {
        req.flash('error', `${findUser.username}, Please write a comment to submit!!`);
        res.redirect(`/product/product-view/${findProduct._id}`);
    } else {
        const addComment = new Subreview(comment);
        addComment.userId = findUser;
        const saveProduct = findProduct.subReview.push(addComment);
        const saveReview = findReview.subReview.push(addComment);
        await addComment.save();
        await findProduct.save();
        await findReview.save();
        req.flash('success', 'Your comment added to the post');
        res.redirect(`/product/product-view/${id}`);
    }

};