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
			throw ErrorService.ErrorServer('SendError', 'Не удалось найти активность пользователя в постах');
		}
	};

	markPost = async (data) => {
		const { idUser, indexPost } = data;
		const UserActivity = await UserActivityModel.findOne({
			idUser: idUser,
		});
		if (!UserActivity) {
			throw ErrorService.ErrorServer('SendError', 'Не удалось найти активность пользователя в постах');
		}

		if (UserActivity.markedPosts[indexPost] === undefined) {
			await this.addMarkPost(UserActivity, indexPost);
			return UserActivity.markedPosts[indexPost];
		}

		if (UserActivity.markedPosts[indexPost] !== undefined) {
			await this.removeMarkPost(UserActivity, indexPost);
			return;
		}
	};

	addMarkPost = async (UserActivity, indexPost) => {
		const post = await PostModel.findOne({ _id: indexPost });

		UserActivity.markedPosts = {
			...UserActivity.markedPosts,
			[indexPost]: {
				ref: post._id,
				isMarked: true,
			},
		};
		await UserActivity.save();
	};

	removeMarkPost = async (UserActivity, indexPost) => {
		const setMarkedPosts = {};

		for (const markedPost in UserActivity.markedPosts) {
			if (markedPost !== indexPost) {
				setMarkedPosts[markedPost] = UserActivity.markedPosts[markedPost];
			}
		}
		UserActivity.markedPosts = setMarkedPosts;
		await UserActivity.save();
	};

	ratingPost = async (data) => {
		const { idUser, indexPost, valueRating } = data;
		const UserActivity = await UserActivityModel.findOne({
			idUser: idUser,
		});
		if (!UserActivity) {
			throw ErrorService.ErrorServer('SendError', 'Не удалось найти активность пользователя в постах');
		}
		const post = await PostModel.findOne({ _id: indexPost });

		if (UserActivity.ratingPosts[indexPost] === undefined && valueRating === 'inc') {
			await this.updateRatingPost(indexPost, 1);
			await this.addRatingPost(UserActivity, post, indexPost, 'inc');
			const valueCounter = await this.getCurrentPostActivity(indexPost, {
				ratingCounter: 1,
			});
			return { ratingPost: UserActivity.ratingPosts[indexPost], valueCounter };
		}
		if (UserActivity.ratingPosts[indexPost] === undefined && valueRating === 'dec') {
			await this.updateRatingPost(indexPost, -1);
			await this.addRatingPost(UserActivity, post, indexPost, 'dec');
			const valueCounter = await this.getCurrentPostActivity(indexPost, {
				ratingCounter: 1,
			});
			return { ratingPost: UserActivity.ratingPosts[indexPost], valueCounter };
		}
		if (UserActivity.ratingPosts[indexPost].value === 'inc' && valueRating === 'dec') {
			await this.updateRatingPost(indexPost, -2);
			await this.addRatingPost(UserActivity, post, indexPost, 'dec');
			const valueCounter = await this.getCurrentPostActivity(indexPost, {
				ratingCounter: 1,
			});
			return { ratingPost: UserActivity.ratingPosts[indexPost], valueCounter };
		}

		if (UserActivity.ratingPosts[indexPost].value === 'dec' && valueRating === 'inc') {
			await this.updateRatingPost(indexPost, 2);
			await this.addRatingPost(UserActivity, post, indexPost, 'inc');
			const valueCounter = await this.getCurrentPostActivity(indexPost, {
				ratingCounter: 1,
			});
			return { ratingPost: UserActivity.ratingPosts[indexPost], valueCounter };
		}

		if (UserActivity.ratingPosts[indexPost].value === 'dec' && valueRating === 'dec') {
			await this.updateRatingPost(indexPost, 1);
			await this.removeRatingPost(UserActivity, indexPost);
			const valueCounter = await this.getCurrentPostActivity(indexPost, {
				ratingCounter: 1,
			});
			return { valueCounter };
		}

		if (UserActivity.ratingPosts[indexPost].value === 'inc' && valueRating === 'inc') {
			await this.updateRatingPost(indexPost, -1);
			await this.removeRatingPost(UserActivity, indexPost);
			const valueCounter = await this.getCurrentPostActivity(indexPost, {
				ratingCounter: 1,
			});
			return { valueCounter };
		}
	};

	getCurrentPostActivity = async (indexPost, selectData) => {
		return await PostModel.findOne({ _id: indexPost }, selectData);
	};

	updateRatingPost = async (indexPost, operation) => {
		await PostModel.updateOne({ _id: indexPost }, { $inc: { ratingCounter: operation } });
	};

	addRatingPost = async (UserActivity, post, indexPost, value) => {
		UserActivity.ratingPosts = {
			...UserActivity.ratingPosts,
			[indexPost]: {
				ref: post._id,
				value,
			},
		};
		await UserActivity.save();
	};

	removeRatingPost = async (UserActivity, indexPost) => {
		const setRatingPosts = {};

		for (const ratingPost in UserActivity.ratingPosts) {
			if (ratingPost !== indexPost) {
				setRatingPosts[ratingPost] = UserActivity.ratingPosts[ratingPost];
			}
		}
		UserActivity.ratingPosts = setRatingPosts;
		await UserActivity.save();
	};
}

export default new UserActivityPostsService();
