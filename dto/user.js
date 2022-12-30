class UserDto {
	userId;
	userName;
	email;
	userImgUrl;

	constructor(model) {
		this.userId = model._id;
		this.userName = model.userName;
		this.email = model.email;
		this.userImgUrl = model.userImgUrl;
	}
}

export default UserDto;
