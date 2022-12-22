import { sendPost } from '../services/postService.js';

const createPost = async (req, res) => {
	try {
		const newPost = await sendPost(req);

		res.json(newPost);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось создать статью',
		});
	}
};

const getPosts = async (req, res) => {
	try {
		res.json({
			messenge: 'Посты отправлены',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось создать статью',
		});
	}
};

export { createPost, getPosts };
