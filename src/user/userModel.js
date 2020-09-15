import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	passwordSalt: {
		type: String,
		required: true,
	},
	lastLogin: Date
});

module.exports = mongoose.model('User', userSchema);
