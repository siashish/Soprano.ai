const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
	postID: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	image: {
		fileKey: { type: String, required: false },
		fileBucket: { type: String, required: false },
		fileVersionID: { type: String, required: false },
		fileLocation: { type: String, required: false }
	},
},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	});

module.exports = mongoose.model('Post', postSchema);