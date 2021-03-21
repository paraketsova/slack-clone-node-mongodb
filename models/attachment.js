const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AttachmentSchema = new Schema({
  name: {
    type: String, // Example: "superman-comics.jpg"
    required: true
  },
  type: {
    type: String, // Example: "image/jpeg"
    required: true
  },
  size: {
    type: Number, // Example (number of bytes): 302011
    required: true
  }
});

module.exports = mongoose.model('Attachment', AttachmentSchema)