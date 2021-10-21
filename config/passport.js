const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const dbConfig = require('./database');

module.exports = passport => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = dbConfig.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // User.findOne({id: jwt_payload.id}, (err, user) => {
    //   if (err) return done(err, false);

    //   // Could be a problematic place
    //   if (user) return done(null, user);
    //   else done(null, false);
    // })
    done(null, false);
  }))
};