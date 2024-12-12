const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: String,
	username: String,
	email: String,
	password: String,
	token: String,
	level: {
		type: Number, 
		default : 1, 
	},
	avatar: {
		type: String, 
		default: 'avatar.jpg'
	},
	progress:{
		type: Number,  
		default: 0, 
	},
});

const User = mongoose.model("users", userSchema);

module.exports = User;
