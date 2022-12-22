import jwt from 'jsonwebtoken';
import tokenModel from '../models/Token.js';

class JwtServices {
	generateJWT = (data) => {
		const accessToken = jwt.sign(data, process.env.ACCESS_JWT_SECRET, {
			expiresIn: '30m',
		});
		const refreshToken = jwt.sign(data, process.env.REFRESH_JWT_SECRET, {
			expiresIn: '30d',
		});
		return {
			accessToken,
			refreshToken,
		};
	};

	validateJWT = (token) => {
		return jwt.verify(token, this.JWT_SECRET);
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

	removeToken = async (token) => {
		await tokenModel.deleteOne({ refreshToken: token });
	};
}

export default new JwtServices();
