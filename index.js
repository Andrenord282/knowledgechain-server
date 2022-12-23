import dots from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import postRouter from './routers/postRouter.js';
import authRouter from './routers/authRouter.js';

dots.config();

const app = express();
app.use(
	cors({
		credentials: true,
		origin: [process.env.CLIENT_URL, 'http://localhost:3000/'],
	}),
);
app.use(cookieParser());
app.use(express.json());
app.use('/', postRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;

const mongooseSet = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

app.get('/', (req, res) => {
	res.json({
		messenge: 'Hello',
	});
});

const handlerMongooseConnect = (err) => {
	if (err) {
		console.log(`ОШИБКА ${err}`);
	}
	console.log('База подключена');
};

const handlerAppListen = (err) => {
	if (err) {
		console.log(err);
	}
	console.log(`Слушатель работает, порт: ${PORT}`);
};

const runApp = async () => {
	try {
		mongoose.set('strictQuery', false);
		mongoose.connect(DB_HOST, mongooseSet, (err) => handlerMongooseConnect(err));
		app.listen(PORT, (err) => handlerAppListen(err));
	} catch (error) {}
};

runApp();
