"use strict";

var _this = void 0;

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: 100
  },
  firstname: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  }
});
UserSchema.virtual('name').get(function () {
  var fullname = 'underfine';

  if (_this.firstname && _this.lastname) {
    fullname = "".concat(_this.firstname, " ").concat(_this.lastname);
  }

  return fullname;
});
UserSchema.virtual('url').get(function () {
  return "/user/".concat(_this._id);
});
module.exports = mongoose.model('User', UserSchema);