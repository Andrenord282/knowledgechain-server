import PostModel from '../models/Post.js';
import UserActivityModel from '../models/UserActivity.js';
import ThemesService from './themesService.js';
import UserActivityPostsDto from '../dto/userActivityPosts.js';
import ErrorService from './errorService.js';

function randomInteger(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

class PostsService {
	createPost = async (data) => {
		try {
			const { author, postId, postName, title, schemaPost, themesPost } = data;
			await PostModel.create({
				author,
				postId,
				postName,
				title,
				schemaPost,
				themesPost,
				ratingCounter: randomInteger(10, 400),
				viewCounter: randomInteger(10, 400),
				commentsCounter: randomInteger(10, 400),
			});
			if (themesPost.length > 0) {
				ThemesService.createThemes(themesPost);
			}
		} catch (error) {
			throw ErrorService.ErrorServer('SendError', 'Не удалось записать пост');
		}
	};

	getPostsList = async (option) => {
		try {
			const { limit, quantitySkipPost, sort, filters } = option;

			const paramsFind = this.setFilterPosts(filters);
			const quantityPost = await PostModel.countDocuments();

			const postListIsOver = () => {
				if (Number(quantitySkipPost + limit) > quantityPost) {
					return true;
				}
				return false;
			};

			const postList = await PostModel.find(paramsFind)
				.skip(quantitySkipPost)
				.sort({ [sort.value]: sort.order })
				.limit(limit);

			return { postList, postListIsOver: postListIsOver() };
		} catch (error) {
			console.log(error);
			// throw ErrorService.ErrorServer('SendError', 'Не удалось отправить посты');
		}
	};

	setFilterPosts = (filters) => {
		if (filters === undefined) return {};
		const paramsFind = {};
		for (const filterName in filters) {
			switch (true) {
				case filterName === 'author':
					paramsFind.author = { $in: filters.author };
					break;
				case filterName === 'themesPost':
					paramsFind.themesPost = { $in: filters.themesPost };
					break;
				case filterName === 'ratingCounter':
					paramsFind.ratingCounter = { $gte: filters.ratingCounter };
					break;

				default:
					break;
			}
		}
		return paramsFind;
	};

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
			return;
		}

		if (UserActivity.markedPosts[indexPost] !== undefined) {
			UserActivity.markedPosts[indexPost];

			UserActivity.save();
			return;
		}
	};
}

export default new PostsService();
