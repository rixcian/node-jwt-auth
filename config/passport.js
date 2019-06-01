const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User'),
      dbConfig = require('./database');

module.exports = passport => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = dbConfig.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({id: jwt_payload.id}, (err, user) => {
      if (err) return done(err, null);

      // Could be a problematic place
      if (user) return done(null, user);
      else done(null, null);
    })
  }))
};