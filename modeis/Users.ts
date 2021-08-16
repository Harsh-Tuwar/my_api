import mongoose from 'mongoose';

// const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema({
	name: {
		maxlength: 100,
		monlength: 2,
		required: true,
		trin: true,
		type: String
	},
	email: {
		lowercase: true,
		maxlength: 255,
		minlength: 5,
		required: false,
		trim: true,
		type: String,
		unique: true
	},
	password: {
		required: true,
		type: String
	},
	birthday: {
		required: true,
		type: Date
	}
});

userSchema.set('toJSON', { virtuals: true });

export default mongoose.model('User', userSchema);