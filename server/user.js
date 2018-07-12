const express = require('express');
const Router = express.Router();

Router.get('/info', function(req,res){
    // with cookie?
    return res.json({code:1});
});

module.exports = Router;