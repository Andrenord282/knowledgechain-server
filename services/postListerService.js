const {
    errorHandler,
    errorPostCratorName,
    errorPostCratorMessages,
} = require('../shared/utilities/errorHandler');
const postModel = require('../models/post');

class PostListerService {
    initPostList = async (data) => {
        const { cursor, limit, sort } = data;
        const posts = await postModel
            .find()
            .skip(cursor)
            .sort({ [sort.value]: sort.order })
            .limit(limit);

        return posts;
    };
}

module.exports = new PostListerService();
