import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const config = {
	NODE_ENV: process.env.NODE_ENV ?? 'development',
	PORT: process.env.PORT ?? 5000,
	MONGO_URL: process.env.MONGO_URL ?? '',
	JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
};