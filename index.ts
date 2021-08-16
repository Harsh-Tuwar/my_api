import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { config } from './config';
import { InitRoutes } from './routes';
import { connect } from './db';

const app = express();
const PORT = config.PORT || 5000;

app.use(
	bodyParser.urlencoded({ extended: false })
);

app.use(bodyParser.json());

app.use(cors());

if (config.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

connect();
InitRoutes(app);

app.listen(PORT, () => {
	console.log(`We're live in ${config.NODE_ENV} mode on port ${PORT}`);
});