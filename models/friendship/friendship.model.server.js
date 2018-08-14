//grab mongoose
const mongoose = require('mongoose');
const friendshipSchema = require('./friendship.schema.server');

// create the actual model
// 1. the name of the model
// 2. schema to validate the model against
const friendshipModel = mongoose.model('FriendshipModel', friendshipSchema);

function makeFriendship(friendship){
    // console.log(friendship);
    return friendshipModel.create(friendship);
}

function breakFriendship(friendship){
    // console.log('breaking friendship');
    // console.log(friendship);
    return friendshipModel.deleteOne(friendship);
}

function findFriendshipsForUser(userId){
    // console.log(userId);
    return friendshipModel
        .find({me: userId})
        .populate('friend')
        .exec();
}

function findFriendsForUser(userId){
    return friendshipModel
        .find({me: userId})
        .populate('friend')
        .exec()
        .then(function(friendships){
            // console.log(friendships);
            let friends = friendships.map(f=>{
                return f.friend;
            });
            return friends;
        });

}

function findAllFriendships(){
    console.log('finding all friendship...');
    return friendshipModel
        .find({})
        .populate('friend')
        .populate('me')
        .exec();
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

function breakFriendshipForUser(userId){
    return friendshipModel.remove({'$or': [{me: userId}, {friend: userId}]})

}


api = {
    makeFriendship: makeFriendship,
    breakFriendship: breakFriendship,
    findFriendshipsForUser: findFriendshipsForUser,
    findFriendsForUser: findFriendsForUser,
    checkDuplicate: checkDuplicate,
    findAllFriendships: findAllFriendships,
    breakFriendshipForUser: breakFriendshipForUser
};

module.exports = api;