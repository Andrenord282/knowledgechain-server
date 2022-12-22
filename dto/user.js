class UserDto {
	id;
	userName;
	email;
	userImgUrl;

	constructor(model) {
		this.id = model._id;
		this.userName = model.userName;
		this.email = model.email;
		this.userImgUrl = model.userImgUrl;
	}
}

export default UserDto;
