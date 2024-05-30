//1.
const express = require('express');
const app = express();  //This helps us to make API req, initialize Server, etc
//import cors
const cors = require('cors');

//import table from MODELS
const db = require('./models')

//To parse the Data in EXPRESS just use
app.use(express.json());

// allow cross-origin requests from any origin by default.
app.use(cors());  //automatically whitelist your API for connection to WORK properly

//ROUTERS
  const postRouter = require('./Routes/Posts');
  //to make this work - apply middleware for router
  app.use("/post", postRouter);
  //by this now we can make post and get req in posts router

  const commentRouter = require('./Routes/Comments');
  app.use("/comments", commentRouter);

  const usersRouter = require('./Routes/Users');
  app.use("/auth", usersRouter);

  const likesRouter = require('./Routes/Likes');
  app.use("/likes", likesRouter);


db.sequelize.sync().then(() => {  //Method provided by Seq: Sync Model with DB that creates neccessary tables in DB
    //Connect DB to obj
    //START API
    app.listen(3003, () => {
        console.log("SERVER is listening on port 3003")
    });
})  //will create everything for you

