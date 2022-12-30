import fs from 'fs';
import ErrorService from './errorService.js';

const fsPromises = fs.promises;

class UploadsService {
	mkDir = async (dirPath) => {
		try {
			await fsPromises.mkdir(dirPath, { recursive: true });
		} catch (error) {
			throw ErrorService.ErrorServer(
				'UploadError',
				'Не удалось создать директория для файлов',
			);
		}
	};

	writeFile = async (dirPath, data) => {
		try {
			for (const name in data) {
				const file = data[name];
				await fsPromises.writeFile(
					`${dirPath}/${file.name}`,
					file.data,
					(err) => {
						if (err) {
							console.log(err);
						}
					},
				);
			}
		} catch (error) {
			throw ErrorService.ErrorServer(
				'UploadError',
				'Не удалось записать файл',
			);
		}
	};
}

export default new UploadsService();
