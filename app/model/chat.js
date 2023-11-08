const db = require('../config/database').getUserDB();
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true,
        versionKey: false
    }
);
const Chat = db.model('chats', chatSchema);

module.exports = Chat;
