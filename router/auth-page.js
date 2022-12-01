const express = require('express');
const router = express.Router();

router.get('/auth' , (req , res , next) => {
    res.render('../views/authenticaion/login.ejs' , {
        title: "Authentication - page"
    });
})
module.exports = router;