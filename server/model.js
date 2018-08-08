const mongoose = require('mongoose');
// connect to mongo using set team6


let DB_URL = 'mongodb://127.0.0.1:27017/team6'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    DB_URL = 'mongodb://' + username + ':' + password;
    DB_URL += '@ds237641.mlab.com:37641/heroku_bq69054b'; // user yours
}


mongoose.connect(DB_URL);
mongoose.connection.on('connected', function(){
    console.log('mongo connect success');
});// tell us if the connection is successful.

const models = {
    user:{
        'user':{'type':String, 'require': true},
        'password':{'type':String, 'require': true},
        'status': {'type':String, 'require':true},
        // headshot
        'avatar':{'type':String},
        'desc':{'type':String},
        'title':{'type':String},
        // if you are hr, two more:
        'company':{'type':String},
        'money':{'type':String},
        'posDesc':{'type':String}
    },
    chat:{}

}

// register key name in mongodb
for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name){
        return mongoose.model(name);
    }
}