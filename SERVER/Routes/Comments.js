const express = require("express");
const router = express.Router();
//export Posts from module where we want to post the data
const { Comments } = require("../models");
//Import Middleware to use in Endpoint
const { validateToken } = require("../Middlewares/AuthMiddleware");


//Create Endpoints
  //make req to server/comments/postID  from where we want to access the comments
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  //Sequelize has Func that can take data based on ID
    //Goes to comments and take postId which is equal to the table's PostId
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.get('/', async (req, res) => {
  const listOfCommentss = await Comments.findAll() // this will go through table, generate SQL to select element from table
  res.json(listOfCommentss)
});

//Route to create Comments
router.post("/", validateToken, async (req, res) => {

  //we need to send the body of comment and the postID
  const comment = req.body;

  //use the username with and in Comment
  const username = req.user.username;

  //Add new Obj username with commnet
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});

router.delete('/:commentId', validateToken, async (req, res) => {
   const commentId = req.params.commentId;

   //SEQUELIZE function to delete a particular object by using its ID
   Comments.destroy({
    where: {
      id: commentId
    }
   });

   res.json("Comment Deleted!!")
})

module.exports = router;