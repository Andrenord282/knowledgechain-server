import UserModel from '../models/User.js';
import ThemesModel from '../models/Themes.js';

class searchService {
	searchAuthors = async (data) => {
		const authors = await UserModel.find(
			{ userName: { $regex: data.value, $options: '$i' } },
			{ userName: 1, _id: 1 },
		);
		if (authors.length > 0) {
			return authors;
		} else {
			return [{ _id: null, userName: 'Пользователь не найден' }];
		}
	};
	searchThemes = async (data) => {
		const themes = await ThemesModel.find(
			{ name: { $regex: data.value, $options: '$i' } },
			{ name: 1 },
		);
		if (themes.length > 0) {
			return themes;
		} else {
			switch (true) {
				case data.variant === 'creatorPost':
					return [{ _id: data.value, name: data.value }];
				case data.variant === 'filterPost':
					return [{ _id: null, userName: 'Тема не найдена' }];
			}
		}
	};
}

export default new searchService();
