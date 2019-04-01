const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    chat_id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;