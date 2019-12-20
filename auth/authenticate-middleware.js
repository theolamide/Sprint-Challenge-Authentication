/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const {authorization} = req.heeaders;
  const secret = process.env.JWT_SECRET || "It is a secret; you have to take it to your grave."

  if (authorization){
    jwt.verify(authorization, secret, function(err,decodedToken){
      if(err){
          res.status(401)
          .json({ you: 'shall not pass!' });
      } else {
        req.token = decodedToken;

        next();
      }
    })
  } else {
    res.status(400)
    .json({message: "please login and try again"})
  }
  
};
