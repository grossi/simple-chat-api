import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const roomSchema = new Schema({
	name: String,
	members: [ObjectId]
});

module.exports = mongoose.model('Room', roomSchema);
