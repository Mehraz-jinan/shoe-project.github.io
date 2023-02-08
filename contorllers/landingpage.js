const Product = require('../models/productModel');
const User = require('../models/user');
const Site = require('../models/sitesetting');
const { cloudinary } = require('../cloudinary');


module.exports.index = async (req, res, next) => {
    const siteDataShow = await Site.find({});
    const findProduct = await Product.find({});
    res.render('../views/landing-page/index.ejs',
        {
            title: `welcome to - ${process.env.PAGENAME}`,
            siteDataShow,
            findProduct,
    })
};

module.exports.siteSettingRendering = (req, res, next) => {
    res.render('../views/dashboard/sitesetting.ejs', {
        title:'Setting- site'
    })
}
module.exports.saveSetting = async (req, res, next) => {
    try {
        if (!req.body) {
            req.flash('error', 'You must submit everything carefully');
            res.redirect('/site-setting')
        } else {
            const newSavings = new Site({
                welcome: req.body.welcome,
            });
            newSavings.bannerImage = req.files.map(f => ({
                url: f.path,
                filename: f.filename,
            }));
            await newSavings.save();
            req.flash('success', 'successfully updated things');
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error', 'Please try later');
        res.redirect('/site-setting')
    }
}
module.exports.editSiteRendering = async(req, res, next) => {
    try {
        const { id } = req.params;
        const formData = await Site.findById(id);
        res.render('../views/dashboard/siteEdit.ejs',
            {
                title: `${process.env.PAGENAME} - Edit Site`,
                formData,
            }
        )
    } catch (error) {
        req.flash('error', 'Something went wrong');
        res.redirect(`/site-setting/${id}`);
    }
}
module.exports.saveEditSite = async (req, res, next) => {
    const { id } = req.params;
    
    const updatedSite = await Site.findByIdAndUpdate(id, {
        welcome: req.body.welcome,
    },
        {
            runValidators: true,
            new: true,
        });
    const images = req.files.map(f => ({
        url: f.path,
        filename: f.filename,
    }));
    updatedSite.bannerImage.push(...images);
    await updatedSite.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await updatedSite.updateOne({ $pull: { bannerImage: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash('success', 'Successfullt updated Site');
    res.redirect('/');
}