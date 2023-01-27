import userActivityPostsService from '../services/userActivityPostsService.js';

class UserActivityPostsController {
	userActivityPosts = async (req, res, next) => {
		try {
			const activity = await userActivityPostsService.userActivityPosts(req.query);
			res.json(activity);
		} catch (error) {
			next(error);
		}
	};

	markPost = async (req, res, next) => {
		try {
			const markPost = await userActivityPostsService.markPost(req.body);
			res.json(markPost);
		} catch (error) {
			next(error);
		}
	};
	ratingPost = async (req, res, next) => {
		try {
			const ratingPost = await userActivityPostsService.ratingPost(req.body);
			res.json(ratingPost);
		} catch (error) {
			next(error);
		}
	};
}

export default new UserActivityPostsController();
