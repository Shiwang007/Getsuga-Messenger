const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: 'string',
        required: true
    },
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
        minlength: 8
    },
    gender: {
        type: 'string',
        required: true,
        enum: ['male', 'female']
    },
    profilePic: {
        type: 'string',
        default: ''
    }
}, {
    timestamps: true,
});

const User = mongoose.model('users', UserSchema);

module.exports = User