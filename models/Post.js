import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const PostSchema = Schema(
	{
		author: {
			type: String,
			require: true,
		},
		postId: {
			type: String,
			require: true,
			unique: true,
		},
		postName: {
			type: String,
			require: true,
			unique: true,
		},
		schemePost: {
			type: Array,
			default: [],
			require: true,
		},
		ratingCounter: {
			type: Number,
			default: 0,
		},
		viewCounter: {
			type: Number,
			default: 0,
		},
		commentsCounter: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Post', PostSchema);
