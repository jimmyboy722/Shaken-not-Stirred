const { Schema, model } = require('mongoose');
//const dateFormat = require('../utils/dateFormat');

const drinkSchema = new Schema({
  drinkName: {
        type: String,
        required: true,
        trim: true,
      },
  drinkDescription: {
    type: String,
    minlength: 1,
    required: true,
    maxlength: 280,
    trim: true,
  },
  drinkAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //get: (timestamp) => dateFormat(timestamp),
  },
});

const Drink = model('Drink', drinkSchema);

module.exports = Drink;
