import path from 'path';
import uploadsService from '../services/uploadsService.js';

class UploadsController {
	upload = async (req, res, next) => {
		try {
			if (req.files !== null) {
				const { postName } = req.body;
				const dirPath = path.join(
					'public',
					'images',
					'posts-images',
					postName,
				);
				await uploadsService.mkDir(dirPath);
				await uploadsService.writeFile(dirPath, req.files);
			}
			res.json({ message: 'файлы загружены и записаны' });
		} catch (error) {
			next(error);
		}
	};
}

export default new UploadsController();
