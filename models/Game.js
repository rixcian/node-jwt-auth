const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

module.exports = mongoose.model('Game', new Schema({
  name: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: false
  }
}));