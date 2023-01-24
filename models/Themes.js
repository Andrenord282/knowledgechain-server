import { Schema, model } from 'mongoose';

const ThemesSchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	siblings: {
		type: Array,
		default: [],
	},
});

export default model('Themes', ThemesSchema);
