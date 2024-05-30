const express = require('express')
const router = express.Router()
//export Posts from module where we want to post the data
const { Post, Likes } = require('../models');
const { validateToken } = require('../Middlewares/AuthMiddleware');

// ENDPOINTS : GET and POST

//In Sequelize everything should be ASYNC to make sure data is inserted to DB
//HERE COMES ALL THE REQUESTS

//Gets (READ) the data from API or Route
router.get('/', validateToken,  async (req, res) => {
    // return elements of table to display on Page
    const listOfPosts = await Post.findAll({include: [Likes]}) // this will go through table, generate SQL to select element from table

    //Elements from Liked Table
    const likedPosts = await Likes.findAll( { where: {UserId: req.user.id}})

    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts})
});

// router.get('/profile', validateToken, async (req, res) => {})


router.get('/byId/:id', async (req, res) => {
   const id = req.params.id
   //Sequelize has Func that can take data based on ID
   const post = await Post.findByPk(id)
   res.json(post);
})

  // Insert (CREATE) data in DB or API
router.post('/', validateToken, async (req, res) => {
    //Write LOGIC regarding INSERTING data in DB
       //Access data send from the frontEnd : we have BODY in req which is an OBJ containing data u r sending in request
       const post = req.body   //Grab data from BODY

       //create new Element in object for adding USERNAME
       post.username = req.user.username;
       post.UserId = req.user.id;

       const newPost = await Post.create(post);  //Sequelize Func to Create -> Inserts into Table
       res.json(newPost);   //return respose for comfirmation
});



//PUT REQUEST TO UPDATE OUR POST
router.put('/title', validateToken, async (req, res) => {
     const {newTitle, id} = req.body;
     await Post.update({title: newTitle}, {where: { id: id}});
     res.json(newTitle);
});

router.put('/postText', validateToken, async (req, res) => {
  const {newText, id} = req.body;
  await Post.update({postText: newText}, {where: { id: id}});
  res.json(newText);
});



//DELETE
router.delete('/:postId', validateToken, async (req, res) => {
  //grab info which post u want to delete from ID at Params
  const postId = req.params.postId

  Post.destroy({
    where: {
      id: postId
    }
   });

   res.json("POST Deleted!!")
})


//Getting all the Post posted by User in PROFILE page based on UserID
router.get('/byuserid/:id', async (req, res) => {
  const id = req.params.id
  //Sequelize has Func that can take data based on ID
  const listOfAllPost = await Post.findAll({
     where: {UserId: id},
     include: [Likes],
  })
  res.json(listOfAllPost);
})



//PUT REQUEST TO UPDATE OUR POST
router.put('/')


module.exports = router