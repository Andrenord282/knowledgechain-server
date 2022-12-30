import postsService from '../services/postsService.js';

class PostsController {
	createPost = async (req, res, next) => {
		try {
			await postsService.createNewPost(req.body);
			res.json({ message: 'пост отправлен и записан' });
		} catch (error) {
			next(error);
		}
	};
}

export default new PostsController();
