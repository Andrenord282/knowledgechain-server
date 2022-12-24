import authService from '../services/authService.js';

class AuthController {
	registation = async (req, res) => {
		try {
			const registationUser = await authService.registration(req);
			res.cookie('refreshToken', registationUser.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			const { refreshToken, ...dataUser } = registationUser;
			res.status(200).json({ ...dataUser });
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
			console.log(logInUser.refreshToken);
			res.cookie('refreshToken', logInUser.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			console.log(req);

			const { refreshToken, ...dataUser } = logInUser;
			res.status(200).json({ ...dataUser });
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

	refresh = async (req, res) => {
		const { refreshToken } = req.cookies;
		const refreshUser = await authService.refresh(refreshToken);
		res.cookie('refreshToken', refreshUser.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		delete refreshUser.refreshToken;
		res.status(200).json({ ...refreshUser });
	};
}

export default new AuthController();
