const express = require('express');
const router =  express.Router();

//get router
router.get('/' , (req , res ,next) => {
    try{
        res.render('../views/common/index.ejs' , {
            title: 'Home - page',
        });
    }
    catch(err){
        res.send(err);
        next(err.message);
    }
})

module.exports = router;