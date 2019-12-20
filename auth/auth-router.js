const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201)
            .json(saved);
    })
    .catch(error => {
        console.log(error)
        res.status(500)
            .json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body;

  Users.findBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signedToken(user)
        res.status(200)
          .json({
            token,
            message: `Welcome to the house of Dad Jokes ${user.username}!`
          })
      } else {
        res.status(401)
          .json({message: 'Invalid Credentials'})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500)
        .json(error);
    });
});

function signedToken(user){
  const payload = { username: user.username};

  const secret = process.env.JWT_SECRET || "It is a secret; you have to take it to your grave.";

  const options = { expiresIn: '30m' };

  return jwt.sign(payload,secret,options)
};

module.exports = router;
