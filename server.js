const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const FRONTEND_URL = 'http://localhost:3000';


const userRouter = require('./server/user');

// create app
const app = express();

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

app.listen(9093,function(){
    console.log('Node app start at port 9093');
});