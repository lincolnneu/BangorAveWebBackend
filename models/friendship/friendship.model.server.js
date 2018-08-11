//grab mongoose
const mongoose = require('mongoose');
const friendshipSchema = require('./friendship.schema.server');

// create the actual model
// 1. the name of the model
// 2. schema to validate the model against
const friendshipModel = mongoose.model('FriendshipModel', friendshipSchema);

function makeFriendship(friendship){
    return friendshipModel.create(friendship);
}

function breakFriendship(friendship){
    return friendshipModel.deleteOne(friendship);
}

function findFriendshipsForUser(userId){
    // console.log(userId);
    return friendshipModel
        .find({me: userId});
}

function checkDuplicate(friendship){
    return friendshipModel.findOne(friendship)
        .then(res => {
            if(res === null){
                // Not duplicate.
                return new Promise(
                    function (resolve, reject){
                        resolve(0);
                    }
                );
            } else {
                // duplicate
                return new Promise(
                    function (resolve, reject){
                        resolve(1);
                    }
                );
            }
        } );
}

api = {
    makeFriendship: makeFriendship,
    breakFriendship: breakFriendship,
    findFriendshipsForUser: findFriendshipsForUser,
    checkDuplicate: checkDuplicate
};

module.exports = api;