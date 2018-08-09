const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const FRONTEND_URL = 'http://localhost:3000';
const models = require('./server/model');
const User = models.getModel('user');
const Chat = models.getModel('chat');


const userRouter = require('./server/user');

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

server.listen(9093,function(){
    console.log('Node app start at port 9093');
});