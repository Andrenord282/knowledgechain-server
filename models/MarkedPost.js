import { Schema, model } from 'mongoose';

const MarkedPostSchema = new Schema({
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
		require: true,
	},
	index: {
		type: String,
		require: true,
		unique: true,
	},
});

export default model('MarkedPost', MarkedPostSchema);
