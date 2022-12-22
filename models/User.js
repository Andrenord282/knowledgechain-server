import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
	{
		email: {
			type: String,
			require: true,
			lowercase: true,
			unique: true,
		},
		userName: {
			type: String,
			require: true,
			unique: true,
		},
		passwordHashed: {
			type: String,
			require: true,
		},
		userImgUrl: {
			type: String,
			default: 'https://clck.ru/3366Y2',
		},
	},
	{
		timestamps: true,
	},
);

export default model('User', UserSchema);
