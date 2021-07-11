const express = require('express');
const router = express.Router();
const config = require('config');
const version = config.get('version');
const jwt = require('jsonwebtoken');
const jwtSecret = config.get('jwtSecret');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const User = require('../models/User');

const upload = require('../service/upload-file.js');
const singleUpload = upload.single('file');

function getPostID(length, char1, char2) {
	var random = '123456789abcdefghijklmnopqrstuvwxyz';
	var result = '';
	for (var i = 0; i < length; i++) {
		result += random.charAt(Math.floor(Math.random() * random.length));
	}
	return result;
}

router.post('/api/' + version + '/post/create', singleUpload, auth, async (req, res) => {
	try {
		//Checking if the user exists
		const user = await User.findOne({ userID: req.user.userID }).select('-password');
		if (!user) return res.status(400).send({ "error": "invalid user" });

		newid = getPostID(8);
		console.log(newid);
		var post_avl = await Post.findOne({ postID: newid });
		while (post_avl) {
			newid = getPostID(8);
			console.log(newid);
			post_avl = await Post.findOne({ postID: newid });
		}

		//POST Create the new user
		post = new Post({
			postID: newid,
			title: req.body.title,
			description: req.body.description,
			image: {
				fileKey: req.file.key,
				fileBucket: req.file.bucket,
				fileVersionID: req.file.versionId,
				fileLocation: req.file.location
			},

		});

		await post.save().then(u => {
			return res.status(201).json({ code: 201, msg: 'Post created successfully' });
		});

	} catch (err) {
		console.error(err.message);
		res.status(500).json({ message: 'Sorry, something went wrong. Please try again later.' });
	}
});

module.exports = router;