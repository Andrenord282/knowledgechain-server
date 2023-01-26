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
			console.log(markPost);
			res.json(markPost);
		} catch (error) {
			next(error);
		}
	};
}

export default new UserActivityPostsController();
