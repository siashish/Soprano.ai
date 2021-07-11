const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const version = config.get('version');
const jwt = require('jsonwebtoken');
const jwtSecret = config.get('jwtSecret');
const User = require('../models/User');
const { userregistervalidation } = require('../validation');

const upload = require('../service/upload-file.js');
const singleUpload = upload.single('file');

function getUserID(length, char1, char2) {
    var random = '0123456789abcdefghijklmnopqrstuvwxyz';
    var result = '';
    result += char1;
    result += char2;
    for (var i = 0; i < length - 2; i++) {
        result += random.charAt(Math.floor(Math.random() * random.length));
    }
    return result;
}

router.post('/api/' + version + '/user/signup', singleUpload, async (req, res) => {
    //LETS VALIDATE THE DATA BEFORE WE ADD LOGIN
    console.log(req.body);
    const { error } = userregistervalidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const { firstName, lastName, email, password } = req.body;
    try {

        newid = getUserID(8, (req.body.firstName)[0], (req.body.lastName)[0]);
        console.log(newid);
        var d = await User.findOne({ userID: newid });
        while (d) {
            newid = getUserID(8, (req.body.firstName)[0], (req.body.lastName)[0]);
            console.log(newid);
            d = await User.findOne({ userID: newid });
        }

        //Checking if the user email is already in database
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ code: 400, msg: 'email already exist' });

        //POST Create the new user
        user = new User({
            userID: newid,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            avatar: {
                fileKey: req.file.key,
                fileBucket: req.file.bucket,
                fileVersionID: req.file.versionId,
                fileLocation: req.file.location
            },

        });
        //hash the password
        newpass = req.body.password;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newpass, salt);

        await user.save();
        const payload = {
            userID: user.userID
        }
        jwt.sign(payload, jwtSecret, {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err
            res.status(200).json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Sorry, something went wrong. Please try again later.' });
    }
});

module.exports = router;