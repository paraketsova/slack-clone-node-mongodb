const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ChannelSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },

});

ChannelSchema
  .virtual('url')
  .get(() => {
    return `/channel/${ this._id }`
  })

module.exports = mongoose.model('Channel', ChannelSchema)