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

			return { status: true, user: { ...userDto, ...tokens } };
		} catch (error) {
			console.log(error.message);
			return { status: false };
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
			return { status: true, user: { ...userDto, ...tokens } };
		} catch (error) {
			console.log(error.message);
			return { status: false };
		}
	};

	authentication = async (req) => {
		const token = req.headers.authorization;
		const user = validateJWT(token);
		console.log();
	};

	logOut = async (req) => {
		const deleteToken = await jwtServices.removeToken(req);
		return deleteToken;
		try {
		} catch (error) {}
	};
}

export default new AuthServices();
