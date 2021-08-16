import { Express } from 'express';
import * as Home from '../controller/Home';
import * as Auth from '../controller/AuthController';

export const InitRoutes = (app: Express) => {
	app.get('/', Home.Init);

	app.post('/login', Auth.LoginUser);
	app.post('/register', Auth.RegisterUser);
}