const express = require('express');
const router =  express.Router();

//get router
router.get('/' , (req , res ,next) => {
    try{
        res.render('../views/landing-page/index.ejs' , {
            title: 'Home - page',
        });
    }
    catch(err){
        res.send(err);
        next(err.message);
    }
})

module.exports = router;