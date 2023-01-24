import UserModel from '../models/User.js';
import UserActivityModel from '../models/UserActivity.js';
import passwordService from './passwordService.js';
import jwtServices from './jwtService.js';
import UserDto from '../dto/user.js';
import ErrorService from './errorService.js';

class AuthServices {
	registration = async (req) => {
		const { email, userName, password } = req.body;
		const userExists = await UserModel.findOne({ email });
		if (userExists) {
			throw ErrorService.BadRequest('UserError', 'Пользователь с таким email уже существует');
		}

		const hachingPassword = await passwordService.encrypt(password);
		const user = await UserModel.create({
			email,
			userName,
			passwordHashed: hachingPassword,
		});
		await UserActivityModel.create({
			user: user._id,
		});
		const userDto = new UserDto(user);
		const tokens = jwtServices.generateJWT({ ...userDto });
		await jwtServices.saveRefreshJWT(userDto.id, tokens.refreshToken);

		return { ...userDto, ...tokens };
	};

	logIn = async (req) => {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });
		if (!user) {
			throw ErrorService.BadRequest('UserError', 'Пользователь не найден');
		}
		const checkPassword = await passwordService.check(password, user.passwordHashed);
		if (!checkPassword) {
			throw ErrorService.BadRequest('UserError', 'Неверная почта или пароль');
		}
		const userDto = new UserDto(user);
		const tokens = jwtServices.generateJWT({ ...userDto });
		await jwtServices.saveRefreshJWT(userDto.id, tokens.refreshToken);

		return { ...userDto, ...tokens };
	};

	logOut = async (req) => {
		try {
			const deleteToken = await jwtServices.removeToken(req);
			return deleteToken;
		} catch (error) {
			throw ErrorService.BadRequest(
				'UserError',
				'Не удалось удалить токен при выходе с учетной записи',
			);
		}
	};

	async refresh(refreshToken) {
		const userData = jwtServices.validateRefreshToken(refreshToken);
		const token = await jwtServices.searchToken(refreshToken);
		if (!userData || !token) {
			throw ErrorService.BadRequest(
				'UserError',
				'Токен не прошел валидацию или токен не найден',
			);
		}
		console.log(userData);
		const user = await UserModel.findById(userData.idUser);
		const userDto = new UserDto(user);
		const tokens = jwtServices.generateJWT({ ...userDto });
		await jwtServices.saveRefreshJWT(userDto.id, tokens.refreshToken);

		return { ...userDto, ...tokens };
	}
}

export default new AuthServices();
