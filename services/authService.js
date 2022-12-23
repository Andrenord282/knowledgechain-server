import UserModel from '../models/User.js';
import passwordService from './passwordService.js';
import jwtServices from './jwtService.js';
import UserDto from '../dto/user.js';

class AuthServices {
	registration = async (req) => {
		try {
			const { email, userName, password } = req.body;

			const hachingPassword = await passwordService.encrypt(password);
			const user = await UserModel.create({
				email,
				userName,
				passwordHashed: hachingPassword,
			});

			const userDto = new UserDto(user);
			const tokens = jwtServices.generateJWT({ ...userDto });
			await jwtServices.saveRefreshJWT(userDto.id, tokens.refreshToken);

			return { ...userDto, ...tokens };
		} catch (error) {
			console.log(error.message);
		}
	};

	logIn = async (req) => {
		try {
			const { email, password } = req.body;
			const user = await UserModel.findOne({ email });
			if (!user) {
				return { status: false };
			}
			const checkPassword = await passwordService.check(
				password,
				user.passwordHashed,
			);

			if (!checkPassword) {
				return { status: false };
			}
			const userDto = new UserDto(user);
			const tokens = jwtServices.generateJWT({ ...userDto });
			await jwtServices.saveRefreshJWT(userDto.id, tokens.refreshToken);
			return { ...userDto, ...tokens };
		} catch (error) {
			console.log(error.message);
			return { status: false };
		}
	};

	logOut = async (req) => {
		const deleteToken = await jwtServices.removeToken(req);
		return deleteToken;
		try {
		} catch (error) {}
	};

	async refresh(refreshToken) {
		const userData = jwtServices.validateRefreshToken(refreshToken);
		const token = await jwtServices.searchToken(refreshToken);
		if (!userData || !token) {
			console.log('Рефрешь токена не сработал');
		}
		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = jwtServices.generateJWT({ ...userDto });
		await jwtServices.saveRefreshJWT(userDto.id, tokens.refreshToken);

		return { ...userDto, ...tokens };
	}
}

export default new AuthServices();
