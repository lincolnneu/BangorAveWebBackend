const mongoose = require('mongoose');
// connect to mongo using set team6
const DB_URL = 'mongodb://127.0.0.1:27017/team6';
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
        'money':{'type':String}
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