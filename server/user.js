const express = require('express');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');


// user list for debug
Router.get('/list',function (req, res) {
    User.find({}, function(err,doc){
        return res.json(doc);
    });
});

Router.post('/register',function(req, res){
    console.log(req.body);
    const {user, password, status} = req.body;
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1, msg:'username already exists!'});
        }
        User.create({user,password,status},function(e,d){
            if(e){
                return res.json({code:1, msg:'sth wrong in backend..'});
            }
            return res.json({code:0});
        })
    });
});


Router.get('/info', function(req,res){
    // with cookie?
    return res.json({code:1});
    // code 0 represents success. 1 represents fail
});

module.exports = Router;