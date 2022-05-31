const mongoose = require('mongoose');

const statusTypeEnums = ['found', 'lost'];

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  description: {
    type: String,
    required: true,
    min: 3,
    max: 1024,
  },
  photo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: statusTypeEnums,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Item', ItemSchema);