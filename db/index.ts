// // import mongoose from 'mongoose';
// import { MongoClient } from 'mongodb';
// import { config } from '../config';

// export async function connect() {
// 	// const client = new mongoose.Mongoose();

// 	// return client.createConnection(config.MONGO_URL, {
// 	// 	useNewUrlParser: true,
// 	// 	keepAlive: true,
// 	// 	useUnifiedTopology: true
// 	// }).then(() => {
// 	// 	console.log('DB Connected');
// 	// }).catch((err) => {
// 	// 	console.log('Error Connecting DB', err);
// 	// });

// 	const client = new MongoClient(config.MONGO_URL, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		keepAlive: true
// 	});

// 	const connection = await client.connect();
	
// 	return connection.db("Users");
// // }

import mongoose from 'mongoose';
import { config } from '../config';

export const connect = () => {
	mongoose.connect(config.MONGO_URL, {
		useUnifiedTopology: true,
		keepAlive: true,
		useNewUrlParser: true,
	}).then(() => { console.log('DB connectted'); });
};