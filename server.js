const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const FRONTEND_URL = 'http://localhost:3000';
const models = require('./models/user/user.schema.server');
const User = models.getModel('user');
const Chat = models.getModel('chat');
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

const userRouter = require('./services/user.service.server');

// create app
const app = express();

//work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {

    socket.on('sendmsg', function (data) {

        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_');
        Chat.create(
            {chatid, from, to, content: msg},
            function (err, doc) {
                io.emit('recvmsg', Object.assign({}, doc._doc))
            })
        // console.log(data);
        // io.emit('receiveMessage', data);
    })
});


app.use(cookieParser());


app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin",FRONTEND_URL); // we accept response from 4200
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS"); // accept these operations.
    res.header("Access-Control-Allow-Credentials","true");
    next(); // if successful, pass it through
});

app.use(bodyParser.json()); // to parse the json from post

// start a middleware
app.use('/user',userRouter);

app.get('/', function (req, res) {
    res.send('home');
});




//job
require('./services/job.service.server')(app);
//below just for job function test
// require('./models/company/company.model.server').createCompany({companyName: "company 2"});
// const companySchema = require('./models/company/company.schema.server');
// mongoose.model('CompanyModel', companySchema);

server.listen(9093,function(){
    console.log('Node app start at port 9093');
});