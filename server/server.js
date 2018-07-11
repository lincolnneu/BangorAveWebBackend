const express = require('express');
const mongoose = require('mongoose');
// connect to mongo using set team6
const DB_URL = 'mongodb://127.0.0.1:27017/team6';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function(){
    console.log('mongo connect success');
});// tell us if the connection is successful.

const User = mongoose.model('user', new mongoose.Schema({
    user:{type:String, require:true},
    age:{type:Number, require:true}
}));
// // add new data
// User.create({
//    user:'philips',
//    age:60
// },function(err,doc){
//    if(!err){console.log(doc);}
//    else{console.log(err);}
// });

// User.remove({age:18},function(err,doc){
//     console.log(doc);
// });

// User.update({'user':'philips'},{'$set':{age:26}},function(err,doc){
//     console.log(doc);
// });

// create app
const app = express();
app.get('/', function(req,res){
    res.send('<h1>Hello World</h1>');
});

app.get('/data',function(req,res){
    // User.find({},function(err,doc){
    //     res.json(doc);
    // }); // find all

    // User.find({user:'philips'},function(err,doc){
    //     res.json(doc);
    // }); // find user is philips. Only find one. Will not return other items if they also meet the criteria.

    User.findOne({user:'philips'},function(err,doc){
        res.json(doc);
    });

    // res.json({name:'cs5610', type:'web'})
});

app.listen(9093,function(){
    console.log('Node app start at port 9093');
});