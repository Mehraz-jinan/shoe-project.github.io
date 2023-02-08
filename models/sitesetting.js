const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const Product = require('./productModel');

const imageSchema = new Schema({
    url: String,
    filename: String,
})
imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload' , '/upload/w_200')
})

const siteSettingSchema = new Schema({
    bannerImage: [imageSchema],
    welcome: {
        type: String,
    },
    
})
const Site = mongoose.model('Site', siteSettingSchema);
module.exports = Site;