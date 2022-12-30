import authService from '../services/authService.js';

class AuthController {
	registation = async (req, res, next) => {
		try {
			const registationUser = await authService.registration(req);
			res.cookie('refreshToken', registationUser.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			const { refreshToken, ...dataUser } = registationUser;
			res.json(dataUser);
		} catch (error) {
			next(error);
		}
	};

	logIn = async (req, res, next) => {
		try {
			const logInUser = await authService.logIn(req);
			res.cookie('refreshToken', logInUser.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			const { refreshToken, ...dataUser } = logInUser;
			res.json(dataUser);
		} catch (error) {
			next(error);
		}
	};
	logOut = async (req, res, next) => {
		try {
			const { refreshToken } = req.cookies;
			await authService.logOut(refreshToken);
			res.clearCookie('refreshToken');
			return res.json({ message: 'Пользователь вышел' });
		} catch (error) {
			next(error);
		}
	};

	refresh = async (req, res, next) => {
		try {
			const { refreshToken } = req.cookies;
			const refreshUser = await authService.refresh(refreshToken);
			res.cookie('refreshToken', refreshUser.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			delete refreshUser.refreshToken;
			res.json(refreshUser);
		} catch (error) {
			next(error);
		}
	};
}

export default new AuthController();
