const mongoose = require('mongoose');

const EmailAuthSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    //TODO: Add 2 step verification later
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const UserModel = mongoose.model('emails', EmailAuthSchema);

module.exports = UserModel;