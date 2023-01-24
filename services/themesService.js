import ThemesModel from '../models/Themes.js';
import ErrorService from './errorService.js';

class ThemesService {
	createThemes = async (themes) => {
		try {
			for (let index = 0; index < themes.length; index++) {
				const theme = themes[index];
				const existTheme = await ThemesModel.findOne({ name: theme });
				if (existTheme) {
					const oldSiblings = existTheme.siblings;
					const newSiblings = themes.filter((_, themeIndex) => {
						return themeIndex !== index;
					});
					existTheme.siblings = [...oldSiblings, ...newSiblings];
					existTheme.save();
					return;
				}
				const siblings = themes.filter((_, themeIndex) => {
					return themeIndex !== index;
				});
				const newTheme = await ThemesModel.create({
					name: theme,
					siblings,
				});
			}
		} catch (error) {
			console.log(error);
			// throw ErrorService.ErrorServer('SendError', 'Не удалось записать темы');
		}
	};
}

export default new ThemesService();
