const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const userRouter = require('./user');

// create app
const app = express();

app.use(cookieParser());
app.use(bodyParser.json()); // to parse the json from post

// start a middleware
app.use('/user',userRouter);

app.listen(9093,function(){
    console.log('Node app start at port 9093');
});