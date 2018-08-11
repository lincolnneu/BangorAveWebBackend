module.exports = function(app){
    app.get('/api/friendship',findFriendshipsForUserLoggedIn);
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
                res.json(friendships);
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
        const {userId} = req.cookies;
        if(!userId){
            console.log('user is not loggedin');
            return res.json({code:1});
        }
        const friendId = req.body.friendId;
        let friendship = {
            me: userId.userId,
            friendId: friendId
        };
        return friendshipModel
            .checkDuplicate(friendship)
            .then(res => {
                if(res === 0){
                    return friendshipModel
                        .makeFriendship(friendship)
                } else {
                    res.sendStatus(403);
                }
            })
    }


    function breakFriendship(req, res){
        const {userId} = req.cookies;
        if(!userId){
            console.log('user is not loggedin');
            return res.json({code:1});
        }
        const friendId = req.body.friendId;
        let friendship = {
            me: userId.userId,
            friendId: friendId
        };
        return friendshipModel
            .breakFriendship(friendship)
            .then((friendship)=>{
                return res.json(friendship);
            });
    }
};