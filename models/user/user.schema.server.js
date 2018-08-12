var mongoose = require('mongoose');

const models = {
    user:{
        'user':{'type':String, 'require': true},
        'password':{'type':String, 'require': true},
        'status': {'type':String, 'require':true},
        'email': {'type':String, 'require':true},
        'phone': {'type':String, 'require':true},
        'address': {'type':String, 'require':true},
        'dob': {'type':String, 'require':true},
        // headshot
        'avatar':{'type':String},
        'desc':{'type':String},
        'title':{'type':String},
        'cvLink':{'type':String},
        'education':{'type':String},
        'skills':{'type':String},
        'experience':{'type':String},
        'awards':{'type':String},
        'publications':{'type':String},
        'languages':{'type':String},
        'website':{'type':String},
        // if you are hr, two more:
        'company':{'type':String},
        'money':{'type':String},
        'posDesc':{'type':String}
    },
    chat:{
        // tow users' id's combination -> ensure that every chat room is unique
        'chatid': {'type': String, 'require': true},
        'from': {'type': String, 'require': true},
        'to': {'type': String, 'require': true},
        'read': {'type': Boolean, 'require': false},
        'content': {'type': String, 'require': true, 'default': ''},
        'create-time': {'type': Number, 'default': new Date().getTime()}
    }

};

// register key name in mongodb
for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name){
        return mongoose.model(name);
    }
}