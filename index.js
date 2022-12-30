import dots from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import configCros from './utilities/configCros.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import formData from 'express-form-data';
import errorMiddleware from './middlewares/errorMiddleware.js';
import postRouter from './routers/postRouter.js';
import uploadsRouter from './routers/uploadsRouter.js'
import authRouter from './routers/authRouter.js';

dots.config();

const app = express();
app.use(cors(configCros));
app.use(express.static(`public`));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(fileUpload());
// app.use(formData.parse());
app.use(express.urlencoded({ limit: '50mb' }));
app.use('/', postRouter, uploadsRouter);
app.use('/auth', authRouter);
app.use(errorMiddleware);

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
