import PostModel from '../models/Post.js';
import UserActivityModel from '../models/UserActivity.js';
import UserActivityPostsDto from '../dto/userActivityPosts.js';
import ErrorService from './errorService.js';

class UserActivityPostsService {
	userActivityPosts = async (option) => {
		try {
			const { idUser } = option;
			const userActivityPosts = await UserActivityModel.findOne({ idUser: idUser });
			const userActivityPostsDto = new UserActivityPostsDto(userActivityPosts);
			return { ...userActivityPostsDto };
		} catch (error) {
			throw ErrorService.ErrorServer(
				'SendError',
				'Не удалось найти активность пользователя в постах',
			);
		}
	};

	markPost = async (data) => {
		const { idUser, indexPost } = data;
		const UserActivity = await UserActivityModel.findOne({
			idUser: idUser,
		});
		if (!UserActivity) {
			throw ErrorService.ErrorServer(
				'SendError',
				'Не удалось найти активность пользователя в постах',
			);
		}

		if (UserActivity.markedPosts[indexPost] === undefined) {
			const post = await PostModel.findOne({ _id: indexPost });

			UserActivity.markedPosts = {
				...UserActivity.markedPosts,
				[indexPost]: {
					ref: post._id,
					isMarked: true,
				},
			};
			UserActivity.save();
			return UserActivity.markedPosts[indexPost];
		}

		if (UserActivity.markedPosts[indexPost] !== undefined) {
			const setMarkedPosts = {};

			for (const markedPost in UserActivity.markedPosts) {
				if (markedPost !== indexPost) {
					setMarkedPosts[markedPost] = markedPost;
				}
			}
			UserActivity.markedPosts = setMarkedPosts;
			UserActivity.save();
			console.log(UserActivity.markedPosts);
			return;
		}
	};
}

export default new UserActivityPostsService();
