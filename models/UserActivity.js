import { Schema, model } from 'mongoose';

const UserActivitySchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
	postRatings: {
		type: Object,
		require: true,
		default: {},
	},
	viewedPosts: {
		type: Object,
		require: true,
		default: {},
	},
	markedPosts: {
		type: Object,
		require: true,
		default: {},
	},
});

export default model('UserActivity', UserActivitySchema);
