const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  ratingId: {
    type: Number,
    required: true,
    unique: true
  },
  ratingDesc: {
    type: {
      ratings: [
        {
          userId: {
            type: String,
            required: true
          },
          rating: {
            type: Number,
            required: true
          },
          comment: {
            type: String,
            default: ""
          }
        }
      ]
    },
    required: true
  }
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;
