const mongoose = require('mongoose');

const FriendsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    friends: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
    ],
    });
    
    module.exports = mongoose.model("Friends", FriendsSchema);
    