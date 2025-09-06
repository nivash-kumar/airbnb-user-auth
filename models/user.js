const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'First name is required']
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    userType: {
        type: String,
        enum: ['guest', 'host'],
        default: 'guest'
    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home'
    }],
});


module.exports = mongoose.model('User', userSchema);