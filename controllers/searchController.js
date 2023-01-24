import searchService from '../services/searchService.js';

class searchController {
	getSearch = async (req, res, next) => {
		try {
			switch (true) {
				case req.params.value === 'authors':
					const authors = await searchService.searchAuthors(req.query);
					res.json(authors);
					break;
				case req.params.value === 'themes':
					const themes = await searchService.searchThemes(req.query);
					res.json(themes);
					break;
				default:
					break;
			}
		} catch (error) {
			next(error);
		}
	};
}

export default new searchController();
