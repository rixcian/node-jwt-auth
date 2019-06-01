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

UserSchema.pre('save', next => {
  let user = this;
  // Can I change this.isModified change it to user.isModified???
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);