
import e, { NextFunction, Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config';
import fs from 'fs';

export const jwtSign = (payload: string | object | Buffer, options: SignOptions) => {
	const signinOptions: SignOptions = {
		algorithm: 'RS256',
		expiresIn: 86400
	}

	try {
		return jwt.sign(payload, 'test', signinOptions);
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const parseTokenFromAuthorizationHeader = (req: e.Request) => {
	const authorizationHeader = req.headers.authorization;

	if (!authorizationHeader) {
		return null;
	}

	return authorizationHeader.split(' ')[1];	
};

// export const verifyToken = (token: string) => {
// 	const verifyOptions: SignOptions = {
// 		algorithm: 'RS256',
// 		expiresIn: 86400
// 	}

// 	try {
// 		return jwt.verify(token, config.JWT_SECRET, verifyOptions);
// 	} catch (err) {
// 		console.log('Error in VerifyToken', err);
// 		return null;
// 	}
// }

export const decode = (token: string) => {
	return jwt.decode(token, { complete: true });
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = parseTokenFromAuthorizationHeader(req);

	if (token) {
		const verifyResult: any = jwt.verify(token, config.JWT_SECRET, { algorithms: ['RS256'], maxAge: '86400' });
		
		if (verifyResult && verifyResult.id) {
			res.locals.userId = verifyResult.id;
			next();
		} else {
			return res.status(403).json({ err: 'Bearer token failed verification' });
		}
	} else {
		return res.status(403).json({ err: 'Bearer token not provided as expected in authorization header' });
	}
};