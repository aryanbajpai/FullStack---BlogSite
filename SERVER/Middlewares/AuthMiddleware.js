//Grab TOKEN sent through Front-End
//VALIDATE using JWT func -> verify()
//If valid send and add comments to DB
//If not then return json resp in req with ERR 

const { verify } = require("jsonwebtoken");

//Create middleware
const validateToken = (req, res, next) => {

    //Grab Token from frontend
  const accessToken = req.header("accessToken");

  //Check if user trying to comment without LOGIN
  if (!accessToken) return res.json({ error: "User not logged in!" });

  //Check if accessToken is VALID - use verify()
  try {
    const validToken = verify(accessToken, "secretaccesskey");
    console.log(validToken)

    // To be able to use USERNAME in FrontEnd
    // validToken is our username and ID that we set to create TOKEN
    // this MiddleWare is executed in every Request, we can create req variables available in every request of MiddleWare
    // Accessed in evry Endpt and Req where this mioddleware is passed
    req.user = validToken;

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(403).json({ error: err });
  }
};

module.exports = { validateToken };