const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    maxlength: 100
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
    required: true,
    maxlength: 100
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  text: {
    type: String,
    required: true,
    maxlength: 1000
  }
});

MessageSchema
  .virtual('url')
  .get(() => {
    return `/message/${ this._id }`
  })

module.exports = mongoose.model('Message', MessageSchema)