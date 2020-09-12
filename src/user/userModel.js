import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	passwordSalt: {
		type: String,
		required: false
	},
	lastLogin: Date
});

module.exports = mongoose.model('User', userSchema);
