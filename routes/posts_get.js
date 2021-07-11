const express = require('express');
const router = express.Router();
const config = require('config');
const version = config.get('version');
const jwt = require('jsonwebtoken');
const jwtSecret = config.get('jwtSecret');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const User = require('../models/User');



router.get('/api/' + version + '/posts', auth, async (req, res) => {
	var limit = 50, offset = 1, sort = -1;
	if (req.query.limit) limit = parseInt(req.query.limit);
	if (req.query.offset) offset = parseInt(req.query.offset);
	if (req.query.sort) sort = parseInt(req.query.sort);
	try {
		//Checking if the user exists
		const user = await User.findOne({ userID: req.user.userID }).select('-password');
		if (!user) return res.status(400).send({ "error": "invalid user" });

		//Checking if the trip exists
		const post = await Post.find().sort({ updatedAt: sort }).skip((offset - 1) * limit).limit(limit * 1);
		if (!post) return res.status(400).send({ code: 400, msg: "Post not avaliable" });

		var posts = [];
		for (var i = 0; i < post.length; i++) {

			var data = {
				postID: post[i].postID,
				title: post[i].title,
				description: post[i].description,
				imageURL: post[i].image.fileLocation,
				createdAt: post[i].createdAt,
				updatedAt: post[i].updatedAt
			}
			posts.push(data);
		}

		res.status(200).json(posts);

	} catch (err) {
		console.error(err.message);
		res.status(500).json({ message: 'Sorry, something went wrong. Please try again later.' });
	}
});

module.exports = router;