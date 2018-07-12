const express = require('express');
const utils = require('utility');

const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');


// user list for debug
Router.get('/list',function (req, res) {
    // User.remove({},function(e,d){}); // remove all user data
    User.find({}, function(err,doc){
        return res.json(doc);
    });
});

Router.post('/login', function(req, res){
    const {user, password} = req.body;
    // findOne(search condition, display condition, callback) 0 means does not display.
    User.findOne({user, password:md5Pwd(password)},{'password':0}, function(err, doc){
        if(!doc){
            return res.json({code:1, msg:'username does not exist or password is wrong.'});
        }
        return res.json({code:0, data: doc});
    });
});


Router.post('/register',function(req, res){
    console.log(req.body);
    const {user, password, status} = req.body;
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1, msg:'username already exists!'});
        }
        User.create({user,password:md5Pwd(password),status},function(e,d){
            if(e){
                return res.json({code:1, msg:'sth wrong in backend..'});
            }
            return res.json({code:0});
        })
    });
});

function md5Pwd(pwd){
    const salt = 'cs5610_team6_938$%#%@*/-+`~';
    return utils.md5(utils.md5(pwd+salt));
}


Router.get('/info', function(req,res){
    // with cookie?
    return res.json({code:1});
    // code 0 represents success. 1 represents fail
});

module.exports = Router;