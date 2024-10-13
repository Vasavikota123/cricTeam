//Player Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const playerSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    matches: {
        type: Number,
        required: true,
      },
    average_score: {
        type: Number,
        required: true,
      }
  }); 

  module.exports = mongoose.model('Player', playerSchema)