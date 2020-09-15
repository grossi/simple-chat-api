import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const messageSchema = new Schema({
	text: String,
	creatorId: ObjectId,
	timeStamp: Date
});

module.exports = mongoose.model('Message', messageSchema);
