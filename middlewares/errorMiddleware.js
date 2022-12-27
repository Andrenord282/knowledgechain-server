import ErrorService from '../services/errorService.js';

const errorMiddleware = (err, req, res, next) => {
	if (err instanceof ErrorService) {
		return res
			.status(err.status)
			.json({ errorName: err.name, message: err.message });
	}
	return res.status(500).json({ message: 'Непредвиденная ошибка' });
};

export default errorMiddleware;
