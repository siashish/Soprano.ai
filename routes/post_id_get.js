const express = require('express');
const router = express.Router();
const config = require('config');
const version = config.get('version');
const jwt = require('jsonwebtoken');
const jwtSecret = config.get('jwtSecret');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const User = require('../models/User');



router.get('/api/' + version + '/posts/:post_id', auth, async (req, res) => {

	try {
		//Checking if the user exists
		const user = await User.findOne({ userID: req.user.userID }).select('-password');
		if (!user) return res.status(400).send({ "error": "invalid user" });

		//Checking if the trip exists
		const post = await Post.findOne({ postID: req.params.post_id });
		if (!post) return res.status(400).send({ code: 400, msg: "Post not avaliable" });

		
		res.status(200).json({
			postID: post.postID,
			title: post.title,
			description: post.description,
			imageURL: post.image.fileLocation,
			createdAt: post.createdAt,
			updatedAt: post.updatedAt
		});

	} catch (err) {
		console.error(err.message);
		res.status(500).json({ message: 'Sorry, something went wrong. Please try again later.' });
	}
});

module.exports = router;