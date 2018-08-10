var mongoose = require('mongoose');

var companySchema = mongoose.Schema({
  companyName: String,
  companyDescription: String,
  companyImg: String,
  companyState: String,
  companyCity: String,
  companyAddress: String
}, {collection: 'company'});
    
module.exports = companySchema;