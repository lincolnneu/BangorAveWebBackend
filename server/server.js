const express = require('express');
const userRouter = require('./user');

// create app
const app = express();

// start a middleware
app.use('/user',userRouter);

app.listen(9093,function(){
    console.log('Node app start at port 9093');
});