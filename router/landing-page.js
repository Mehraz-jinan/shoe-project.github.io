const express = require('express');
const router = express.Router({
    mergeParams: true,
});
const Product = require('../models/productModel');
const homeController = require('../contorllers/landingpage');
const { isLoggedIn } = require('../middleware');
const { isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const Site = require('../models/sitesetting');

router.get('/',
    homeController.index
);
router.route('/site-setting')
    .get(
        isLoggedIn,
        isAuthor,
        homeController.siteSettingRendering,
    )
    .post(
        isLoggedIn,
        isAuthor,
        upload.array('bannerImage'),
        homeController.saveSetting,
)
router.route('/site-setting/:id')
    .get(
        isLoggedIn,
        isAuthor,
        homeController.editSiteRendering,
)
    .put(
        isLoggedIn,
        isAuthor,
        upload.array('bannerImage'),
        homeController.saveEditSite,
    )

module.exports = router;