const express = require('express');
const router = express.Router();
const config = require('config');
const version = config.get('version');
const jwt = require('jsonwebtoken');
const jwtSecret = config.get('jwtSecret');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const User = require('../models/User');

router.patch('/api/' + version + '/posts/:post_id/update', auth, async (req, res) => {

	try {
		//Checking if the user exists
		const user = await User.findOne({ userID: req.user.userID }).select('-password');
		if (!user) return res.status(400).send({ "error": "invalid user" });

		//Checking if the trip exists
		const post = await Post.findOne({ postID: req.params.post_id });
		if (!post) return res.status(400).send({ code: 400, msg: "Post not avaliable" });


		var objForUpdate = {};

		if (req.body.title) objForUpdate.title = req.body.title;
		if (req.body.description) objForUpdate.description = req.body.description;

		objForUpdate = { $set: objForUpdate }

		Post.findOneAndUpdate(
			{ postID: req.params.post_id }, // find a document with that filter
			objForUpdate, // document to insert when nothing was found
			//{ upsert: true, new: true, runValidators: true }, // options
			function (err, doc) { // callback
				if (err) {
					console.log(err);
					return res.status(500).send({ code: 500, msg: "Something went wrong. Please try again later." });
				} else {
					return res.status(200).json({ code: 200, msg: 'Post updated successfully' });
				}
			}
		);


	} catch (err) {
		console.error(err.message);
		res.status(500).json({ message: 'Sorry, something went wrong. Please try again later.' });
	}
});

module.exports = router;