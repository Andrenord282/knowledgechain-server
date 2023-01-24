import postsService from '../services/postsService.js';

class PostsController {
	createPost = async (req, res, next) => {
		try {
			await postsService.createPost(req.body);
			res.json({ message: 'пост отправлен и записан' });
		} catch (error) {
			next(error);
		}
	};

	getPosts = async (req, res, next) => {
		try {
			const postList = await postsService.getPostsList(req.query);
			res.json(postList);
		} catch (error) {
			next(error);
		}
	};

	markPost = async (req, res, next) => {
		try {
			const postList = await postsService.markPost(req.body);
			res.json(postList);
		} catch (error) {
			next(error);
		}
	};
}

export default new PostsController();
