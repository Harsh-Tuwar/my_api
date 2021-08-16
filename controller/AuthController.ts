import express from 'express';
import bcrypt from 'bcryptjs';
import {Db } from 'mongodb';
import User from '../modeis/Users';
import { jwtSign } from '../helpers';

export const LoginUser = (req: express.Request, res: express.Response) => {
	const { email, pass } = req.body;

	if (!email || !pass) {
		res.status(400).send('Email or password is missing');
		return;
	}

	User.findOne({ email }, (err: Error, user: any) => {
		if (err) {
			return res.status(500).json({ err: err });
		}

		console.log(user);
		if (user) {
			const { _id, email, password } = user;
			const passMatch = bcrypt.compareSync(pass, password);

			if (passMatch) {
				const payload = { id: _id };
				const signinOptions = { subject: email };
				const signedToken = jwtSign(payload, signinOptions);
				
				return res.status(200).json({ auth: true, token: signedToken });
			} else {
				return res.status(401).json({ auth: false, token: null });
			}
		} else {
			return res.status(404).json({ auth: false, err: 'User not found' });
		}
	})
};

export const RegisterUser = async (req: express.Request, res: express.Response) => {
	const { email, password, name, birthday } = req.body;

	if (!email || !password || !name || !birthday) {
		return res.status(400).json({ registered: false, err: 'Invalid parameter in request' });
	}

	const hashedPass = bcrypt.hashSync(password, 8);
	
	User.create({
		name: name,
		email: email,
		password: hashedPass,
		birthday: birthday
	  }, function (error, user) {
			if (error) {
				const message = `Server error: ${error.message}`
				return res.status(500).json({ registered: false, error: message });
			}
	
		  	const payload = { id: user._id }
		  	const options = { subject: email }
		  	const signedToken = jwtSign(payload, options)
		 
			return res.status(200).send({ registered: true, token: signedToken });
		});
};

export const GetAll = (req: express.Request, res: express.Response) => {

}