const mongoose = require('mongoose'),
      passport = require('passport'),
      bcrypt = require('bcrypt-nodejs'),
      dbConfig = require('../config/database');
      require('../config/passport')(passport);
const express = require('express'),
      jwt = require('jsonwebtoken'),
      router = express.Router(),
      User = require('../models/User'),
      Game = require('../models/Game');

getToken = headers => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

router.post('/register', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {

    // Generating salt and then password hash
    bcrypt.genSalt(10, (err, salt) => {
      if (err) res.json({success: false, msg: 'Something wrong with server, we gonna figure it out!'});
      bcrypt.hash(req.body.password, salt, null, (err, hash) => {
        if (err) res.json({success: false, msg: 'Something wrong with server, we gonna figure it out!'});

        // Creates a new use with password hash
        let newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash
        });

        // Saving a new user
        newUser.save(err => {
          if (err) {console.log(err); return res.json({success: false, msg: 'Username already exists!'});}
          res.json({success: true, msg: 'User was successfully created!'});
        });
      });
    });

  }
});

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err) throw err; // Here could be a better solution

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed! User wasn\'t found!'});
    } else {
      // Check if passwords matches
      user.comparePassword(req.body.password, user.password, (err, isMatch) => {
        if (isMatch && !err) {
          // User was found and passwords matches
          const token = jwt.sign(user.toJSON(), dbConfig.secret, {
            expiresIn: 604800 // 1 week
          });
          res.json({success: true, token: `JWT ${token}`});
        } else {
          res.status(401).send({success: false, msg: 'Wrong password!'});
        }
      })
    }
  })
});

router.get('/games', passport.authenticate('jwt', { session: false}), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    Game.find(function (err, games) {
      if (err) return next(err);
      res.json(games);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;