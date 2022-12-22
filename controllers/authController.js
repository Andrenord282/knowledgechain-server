import authService from '../services/authService.js';

class AuthController {
	registation = async (req, res) => {
		try {
			const registationUser = await authService.registration(req);
			res.cookie('refreshToken', registationUser.user.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.status(200).json(registationUser);
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: 'Не удалось зарегестрировать',
			});
		}
	};
	logIn = async (req, res) => {
		try {
			const logInUser = await authService.logIn(req);
			console.log(logInUser);
			res.cookie('refreshToken', logInUser.user.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.status(200).json(logInUser);
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: 'Не удалось зарегестрировать',
			});
		}
	};
	logOut = async (req, res) => {
		try {
			const { refreshToken } = req.cookies;
			const logOutUser = await authService.logOut(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(logOutUser);
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: 'Ошибка',
			});
		}
	};
}

export default new AuthController();
