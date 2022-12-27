const originsCros = [
	'https://knowledgechain-app.vercel.app',
	'http://localhost:3000',
];

const configCros = {
	origin: (origin, callback) => {
		if (originsCros.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	optionsSuccessStatus: 200,
	credentials: true,
};

export default configCros;
