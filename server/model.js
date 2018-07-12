const mongoose = require('mongoose');
// connect to mongo using set team6
const DB_URL = 'mongodb://127.0.0.1:27017/team6';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function(){
    console.log('mongo connect success');
});// tell us if the connection is successful.