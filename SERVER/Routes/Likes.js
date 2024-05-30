const express = require('express')
const router = express.Router()
//export Posts from module where we want to post the data
const { Likes } = require('../models');
const { validateToken } = require('../Middlewares/AuthMiddleware');

router.post('/', validateToken, async (req, res) => {
    const { PostId } = req.body;   //Grab POSTID from Body
    const UserId = req.user.id;    //Grab UserID from Token = Middleware

    //Check if user has liked POSt or not
    const found = await Likes.findOne({ where: {PostId: PostId, UserId: UserId}});

    if(!found) {
        //If not Liked then, LIKE the POST
        Likes.create( {PostId: PostId, UserId: UserId});
        res.json({liked: true});
    } else {
        //else Unlike the POST => DESTROY 
        await Likes.destroy({
            where: {PostId: PostId, UserId: UserId},
        })
        res.json({liked: false});
    }
} )


module.exports = router