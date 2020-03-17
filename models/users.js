const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	admin: {
		type: Boolean,
		required: true,
		default: false
	}
});

var Users = mongoose.model('User',User);
module.exports = Users;