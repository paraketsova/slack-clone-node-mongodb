const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({

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
  },
  email: {
    type: String,
    required: true
  }
})
UserSchema
  .virtual('name')
  .get(() => {
    let fullname = 'underfine'

    if (this.firstname && this.lastname) {
      fullname = `${this.firstname} ${this.lastname}`;
    }
    return fullname;
  })

UserSchema
  .virtual('url')
  .get(() => {
    return `/user/${ this._id }`
  })

module.exports = mongoose.model('User', UserSchema)