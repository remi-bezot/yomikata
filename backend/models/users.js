const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  name : String,
  username : String,
  email : String,
  password: String,
  token: String,
  level : String,
  avatar : String, 
  progress : String,

});

const User = mongoose.model('users', userSchema);

module.exports = User;