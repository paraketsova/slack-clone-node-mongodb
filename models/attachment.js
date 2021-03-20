const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AttachmentSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Attachment', AttachmentSchema)