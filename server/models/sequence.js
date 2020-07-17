
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  maxCommandId: {type: Number, required: true}
});

module.exports = mongoose.model('Sequence', schema);
