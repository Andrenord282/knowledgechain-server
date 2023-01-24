class UserDto {
	idUser;
	userName;
	email;
	userImgUrl;

	constructor(model) {
		this.idUser = model._id;
		this.userName = model.userName;
		this.email = model.email;
		this.userImgUrl = model.userImgUrl;
	}
}

export default UserDto;
