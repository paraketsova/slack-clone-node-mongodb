"use strict";

var _this = void 0;

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ChannelSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});
ChannelSchema.virtual('url').get(function () {
  return "/channel/".concat(_this._id);
});
module.exports = mongoose.model('Channel', ChannelSchema);