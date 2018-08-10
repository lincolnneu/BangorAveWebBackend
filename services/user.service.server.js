const express = require('express');
// const utils = require('utility');

const Router = express.Router();
const userSchema = require('../models/user/user.schema.server');
const UserModel = require('../models/user/user.model.server');
const Chat = userSchema.getModel('chat');
const _filter = {'password':0, '__v':0}; // mask out password and version when send back data to client.

// user list for debug
Router.get('/list',function (req, res) {
    // const type  = req.query.type;
    const { status } = req.query;

    // User.remove({},function(e,d){}); // remove all user data
    if(status === 'admin'){
        UserModel.findAllUsers()
            .then(function(doc){
                return res.json({code:0, data: doc});
            })
    } else {
        UserModel.findUsersByStatus({status})
            .then(function(doc){
                return res.json({code:0, data:doc});
            })
    }

});

Router.post('/updateProfile',function(req, res){
    // const {userId} = req.cookies;
    // // without cookie?
    // if(!userId){
    //     return res.json({code:1});
    // }
    const userId = req.cookies.userId;
    if(!userId){
        return json.dumps({code: 1})
    }
    const body = req.body;
    // check if the id exists and then update
    // This is a mongoose function. params are user id, data to change, function
    UserModel.findUserByIdAndUpdate(userId, body)
        .then(function(doc){
            const data = Object.assign({},{
                user: doc.user,
                status: doc.status
            }, body); // combine body data into data. ... needs es6.
            // console.log(doc);
            // console.log(data);
            return res.json({code: 0, data});
        })
})

Router.post('/login', function(req, res){
    const {user, password} = req.body;
    // findOne(search condition, display condition, callback) 0 means does not display.
    UserModel.findUserByCredentials({user, password},_filter)
        .then( function(doc){
            if(!doc){
                return res.json({code:1, msg:'username does not exist or password is wrong.'});
            }
            console.log('log in success. return cookie');
            res.cookie('userId', doc._id); // use _id generated by mongodb as userId. write into cookie.
            return res.json({code:0, data: doc});
        })
});


Router.post('/register',function(req, res){
    // console.log(req.body);
    const {user, password, status} = req.body;
    let avatar = null;
    if(user === 'admin' || req.body.avatar != null){
        avatar = req.body.avatar;
    }
    UserModel.findUserByUsername({user:user})
        .then(function(doc){
            if(doc){
                return res.json({code:1, msg:'username already exists!'});
            }
            // Since create cannot get user id, we switch to save.
            UserModel.createUser(user, password,status,avatar)
                .then(function(d){
                    if(!d){
                        return res.json({code:1, msg:'sth wrong in backend..'});
                    }
                    const {user, status, _id} = d;
                    res.cookie('userId', _id); // write cookie
                    return res.json({code:0, data:{user, status, _id}});
                });
        });
});

// create user directly from admin users list
Router.post('/createUser',function(req, res){
    // console.log(req.body);
    const {user, password, status} = req.body;
    let avatar = null;
    if(user === 'admin' || req.body.avatar != null){
        avatar = req.body.avatar;
    }
    return UserModel.findUserByUsername({user:user})
        .then(function(doc){
            if(doc){
                return res.json({code:1, msg:'username already exists!'});
            }
            // Since create cannot get user id, we switch to save.
            return UserModel.createUser(user, password,status,avatar)
                .then(function(d){
                    if(!d){
                        return res.json({code:1, msg:'sth wrong in backend..'});
                    }
                    const {user, status, _id} = d;
                    return res.json({code:0, data:{user, status, _id}});
                });
        });
});

Router.get('/info', function(req,res){
    const {userId} = req.cookies;
    // without cookie?
   if(!userId){
        console.log('user is not loggedin');
       return res.json({code:1});
   }
    UserModel.findUserById({_id:userId}, _filter)
        .then(function(doc){
            if(!doc){
                return res.json({code:1, msg:"sth wrong with backend"});
            }
            if(doc){
                console.log('loggin success, returning cookie');
                return res.json({code:0, data: doc});
            }});
    // code 0 represents success. 1 represents fail
});

//----------------------------------chat--------------------------------------------------------------------

Router.get('/getmsglist', function (req, res) {
    const user = req.cookies.userId;
    console.log(user);

    UserModel.findAllUsers().then(
        doc => {
            let users = {};
            doc.forEach(
            v => {
                users[v._id] = {name: v.user, avatar: v.avatar}
            });
            //{'$or': [{from: user, to: user}]}
            UserModel
                .findAllChats({'$or': [{from: user}, {to: user}]})
                .then(
                    msgs => {
                        console.log(msgs);
                        res.json({
                            code: 0,
                            msgs: msgs,
                            users: users
                        })
                    }

                )
        }
    )

    //{'$or': [{from: user, to:user}]}
    // Chat.find({}, function (err, doc) {
    //     if(!err) {
    //         return res.json({code: 0, msgs: doc})
    //     }
    // })
});



//----------------------------------chat--------------------------------------------------------------------



module.exports = Router;