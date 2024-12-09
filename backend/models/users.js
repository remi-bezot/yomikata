const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  nom : String,
  prenom : String,
  email : String,
  password: String,
  token: String,
  niveau : String,
  avatar : String, 
  progress : String,

});

const User = mongoose.model('users', userSchema);

module.exports = User;