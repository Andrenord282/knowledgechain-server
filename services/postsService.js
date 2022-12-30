import PostModel from '../models/Post.js';
import ErrorService from './errorService.js';
import uploadsService from './uploadsService.js';

class PostsService {
	createNewPost = async (data) => {
		try {
			const { author, postId, postName, title, schemePost } = data;
			await PostModel.create({
				author,
				postId,
				postName,
				title,
				schemePost,
			});
			
		} catch (error) {
			throw ErrorService.ErrorServer('SendError', 'Не удалось записать пост');
		}
	};
}

export default new PostsService();
