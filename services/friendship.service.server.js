module.exports = function(app){
    app.get('/api/friendship',findFriendsForUserLoggedIn);
    app.post('/api/friendship',makeFriendship);
    app.post('/api/admin/friendship',findFriendshipsForUser);
    app.delete('/api/friendship',breakFriendship);

    const friendshipModel = require('../models/friendship/friendship.model.server');

    function findFriendshipsForUserLoggedIn(req, res){
        const {userId} = req.cookies;
        if(!userId){
            console.log('user is not loggedin');
            return res.json({code:1});
        }
        // console.log(userId);
        friendshipModel
            .findFriendshipsForUser(userId)
            .then(function(friendships){
                console.log(friendships);
                res.json({code:0, data:friendships});
            });
    }

    function findFriendsForUserLoggedIn(req, res){
        const {userId} = req.cookies;
        if(!userId){
            console.log('user is not loggedin');
            return res.json({code:1});
        }
        friendshipModel
            .findFriendsForUser(userId)
            .then(function(friends){
                res.json({code:0, data:friends});
            });
    }


    function findFriendshipsForUser(req, res){
        const userId = req.params.userId;
        friendshipModel
            .findFriendshipsForUser(userId)
            .then(function(friendships){
                res.json(friendships);
            });
    }

    function makeFriendship(req, res){
        const userId = req.cookies.userId;
        if(!userId){
            console.log('user is not loggedin');
            return res.json({code:1});
        }
        const friendId = req.body.friendId;
        let friendship1 = {
            me: userId,
            friend: friendId
        };

        let friendship2 = {
            me: friendId,
            friend: userId
        };
        return friendshipModel
            .checkDuplicate(friendship1)
            .then(result => {
                if(result === 0){
                    return friendshipModel
                        .makeFriendship(friendship1)
                        .then(()=>{
                            return friendshipModel
                                .makeFriendship(friendship2)
                                .then((friendship)=>{
                                    return res.json(friendship);
                                });
                        })
                } else {
                    res.sendStatus(403);
                }
            })
    }


    function breakFriendship(req, res){
        const userId = req.cookies.userId;
        if(!userId){
            console.log('user is not loggedin');
            return res.json({code:1});
        }
        const friendId = req.body.friendId;
        let friendship1 = {
            me: userId,
            friend: friendId
        };

        let friendship2 = {
            me: friendId,
            friend: userId
        };
        return friendshipModel
            .breakFriendship(friendship1)
            .then(()=>{
                friendshipModel
                    .breakFriendship(friendship2)
                    .then((friendship)=>{
                        return res.json(friendship);
                    });
            })

    }
};