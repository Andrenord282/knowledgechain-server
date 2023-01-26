class UserActivityPostsDto {
	idUser;
	postRatings;
	viewedPosts;
	markedPosts;

	constructor(model) {
		this.idUser = model.idUser;
		this.postRatings = model.postRatings;
		this.viewedPosts = model.viewedPosts;
		this.markedPosts = model.markedPosts;
	}
}

export default UserActivityPostsDto;