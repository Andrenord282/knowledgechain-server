import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const PostSchema = Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			require: true,
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
