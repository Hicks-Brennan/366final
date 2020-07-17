 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  description: { type: String },
  difficulty: { type: String },
});

module.exports = mongoose.model('Command', schema);