import { Schema, model } from 'mongoose';

const UserActivitySchema = new Schema({
	idUser: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
	title: {
		type: String,
	},
	postRatings: {
		type: Object,
		default: {},
	},
	viewedPosts: {
		type: Object,
		default: {},
	},
	markedPosts: {
		// type: Object,
		// default: {},
	},
});

export default model('UserActivity', UserActivitySchema);
