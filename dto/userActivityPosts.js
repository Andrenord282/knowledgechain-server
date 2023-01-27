class UserActivityPostsDto {
	idUser;
	ratingPosts;
	viewedPosts;
	markedPosts;

	constructor(model) {
		this.idUser = model.idUser;
		this.ratingPosts = model.ratingPosts;
		this.viewedPosts = model.viewedPosts;
		this.markedPosts = model.markedPosts;
	}
}

export default UserActivityPostsDto;