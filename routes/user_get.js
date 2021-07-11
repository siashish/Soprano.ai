const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwtSecret = config.get('jwtSecret');
const version = config.get('version');
const auth = require('../middleware/auth');
const User = require('../models/User');

const ID = config.get('ID');
const SECRET = config.get('SECRET');
var AWS = require('aws-sdk')


router.get('/api/' + version + '/user', auth, async (req, res) => {
	try {
		//Checking if the user exists
		const user = await User.findOne({ userID: req.user.userID }).select('-password');
		if (!user) return res.status(400).send({ "error": "invalid user" });

		res.json({ 'firstName': user.firstName, 'lastName': user.lastName, 'email': user.email, 'avatar': user.avatar.fileLocation });

	} catch (err) {
		console.error(err.message);
		res.status(500).json({ message: 'Sorry, something went wrong. Please try again later.' });
	}
});

module.exports = router;