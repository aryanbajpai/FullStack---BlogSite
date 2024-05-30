//Apply this route to application for Registering new Users

const express = require('express')
const router = express.Router()
const { Users } = require('../models');

const jwt = require('jsonwebtoken');

//Allows to implement Hashing -> Convert pswd to rndm str and to know org pswd we need to HASH another Str and Match the rndm str 
const bcrypt = require('bcrypt');
const { validateToken } = require('../Middlewares/AuthMiddleware');

// To use Secret Key from env file
require('dotenv').config();


//To insert User to db
   // ROUTE FOR REGISTRATION
router.post('/', async (req, res) => {
    //logic for registering user to db
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then( (hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("SUCCESS");
    })
});

//ROUTE FOR LOGIN
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    //Ask if username exists already
    const user = await Users.findOne({
        where:{username: username}
    })

    if(!user) res.json({ error: "User doesn't exists.."})
    //if user exists compare the pswd
    bcrypt.compare(password, user.password).then( (match) => {
        if(!match) res.json({error: "Invalid username or password"});

        //GENERATE TOKEN
        const accessToken = jwt.sign({username: user.username, id: user.id}, process.env.SECRET_ACCESS_KEY)
        //give ACCESS of TOKEN
        res.json({token: accessToken, username: username, id: user.id})
        //SAVE TOKEN to SESSION Strg to be able to use in Front-End
    })
})

//For FAKE TOKEN
router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
})

router.get('/info/:id', async (req, res) => {
    const id = req.params.id;

    const basicInfo = await Users.findByPk(id, {   //Query from the USERS Table
        attributes: {    //ExtraInfo for this QUERY
            exclude: ["password"]   //This info tells to just EXCLUDE Password field from the Request
        }
    });

    res.json(basicInfo);
})

//Change Password
router.put('/changePswd', validateToken, async ( req, res ) => {
    const { oldPswd, newPswd } = req.body;

    const user = await Users.findOne({
        where:{username: req.user.username}
    })

    bcrypt.compare(oldPswd, user.password).then( (match) => {
        if(!match) res.json({error: "Wrong password entered"});

        bcrypt.hash(newPswd, 10).then( (hash) => {
            Users.update({password: hash}, {where: {username: req.user.username}});
            res.json("SUCCESS");
        })
    })
})

module.exports = router