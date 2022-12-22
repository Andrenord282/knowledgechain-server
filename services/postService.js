import PostModel from  '../models/Post.js'

const sendPost = async (req) => {
	try {
		const { author, title, schemePost } = req.body;
		const doc = new PostModel({
			author,
			title,
			schemePost,
		});
		const post = await doc.save();
		return { statue: true, post };
	} catch (error) {
		console.log(error);
		return { statue: false };
	}
};

export { sendPost };
