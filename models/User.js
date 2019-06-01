const mongoose = require('mongoose'),
      bcrypt = require('bcrypt-nodejs'),
      Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.comparePassword = (passw, passwOrig, cb) => {
  bcrypt.compare(passw, passwOrig, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);