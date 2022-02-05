const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: false,
        default: null
    },
    bio: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    profession: {
        type: String,
        required: false,
    }
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;