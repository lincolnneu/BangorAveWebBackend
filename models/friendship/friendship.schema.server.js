const mongoose = require('mongoose');

const friendshipModel = {
    me: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'},
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'}
};

const friendShipSchema = mongoose.Schema(friendshipModel, {collection: 'friendships'});

module.exports = friendShipSchema;