import jwt from 'jsonwebtoken';
import tokenModel from '../models/Token.js';

class JwtServices {
	generateJWT = (data) => {
		const accessToken = jwt.sign(data, process.env.ACCESS_JWT_SECRET, {
			expiresIn: '1d',
		});
		const refreshToken = jwt.sign(data, process.env.REFRESH_JWT_SECRET, {
			expiresIn: '30d',
		});
		return {
			accessToken,
			refreshToken,
		};
	};

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.REFRESH_JWT_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}

	searchToken = async (refreshToken) => {
		try {
			const tokenData = await tokenModel.findOne({ refreshToken });
			return tokenData;
		} catch (error) {
			console.log('Рефреш токен в базе не найден');
		}
	};

	saveRefreshJWT = async (idUser, refreshToken) => {
		const tokenData = await tokenModel.findOne({ user: idUser });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await tokenModel.create({
			user: idUser,
			refreshToken,
		});
		return token;
	};

	removeToken = async (refreshToken) => {
		await tokenModel.deleteOne({ refreshToken });
	};
}

export default new JwtServices();
