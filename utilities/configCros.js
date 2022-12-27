import crosList from './crosList.js';

const configCros = {
	origin: (origin, callback) => {
		if (crosList.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error(`CORS не разрешеный origin: ${origin}`));
		}
	},
	optionsSuccessStatus: 200,
	credentials: true,
};

export default configCros;
