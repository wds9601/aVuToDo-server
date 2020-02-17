require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')
let router = require('express').Router()

// POST /auth/login (find and validate user; send token)
router.post('/login', (req, res) => {
  console.log(req.body)
  // Find user
  db.User.findOne({ email: req.body.email })
  .then(user => {
    // Make sure the user exists and has a password
    if (!user || !user.password) {
      return res.status(404).send({ message: 'User not found!'})
    }

    // Good - they do exist.  Now check the password
    if(!user.isValidPassword(req.body.password)) {
      return res.status(401).send({ message: 'Invalid password' })
    }

    //Good user - issue a token and send it
    let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 8 // 60 seconds
    })
    res.send({token})
  })
  .catch(err => {
    console.log('Error in POST /auth/login', err)
    res.status(503).send({ message: 'Database or server error' })
  })
})

// POST to /auth/signup (create user; generate token)
router.post('/signup', (req, res) => {
  console.log(req.body)
  //look up user and make sure not a duplicate
  db.User.findOne({
    email: req.body.email
  })
  .then(user => {
    //If user exists, do NOT let them create another account!
    if (user) {
      //Bad - this is signup, they should not already exist
      return res.status(409).send({ message: 'Email address already in use!' })
    }
    //Good - user does not already exist
    db.User.create(req.body)
    .then(newUser => {

      // Cool - i have a user.  Now i need to make them a token
      let token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 8 // shorter expiration for development // normally could be something like: 60 * 60 * 8 //e.g. 8 hours (in seconds)
      }) // 3 arguments in 'sign' method: obejct we want to make token from, jwt secret, options

      // Send the token
      res.send({ token })
    })
    .catch(err => {
      console.log('Error when creating user', err)
      res.status(500).send({ message: 'Error creating user' })
    })
  })
  .catch(err => {
    console.log('Error in POST /auth/signup')
    res.status(503).send({ message: 'Database or server error' })
  })
})

// NOTE: User should be logged in to access this route
router.get('/profile', (req, res) => {
  // The user is logged in, so req.user should have data!
  // TODO: Anything you want here!

  // NOTE: This is the user data from the time the token was issued
  // WARNING: If you update the user info those changes will not be reflected here
  // To avoid this, reissue a token when you update user data
  res.send({ message: 'Secret message for logged in people ONLY!' })
})

module.exports = router
