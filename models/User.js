const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
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

module.exports = mongoose.model('User', userSchema);