const mongoose = require('mongoose');


const jobSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'CompanyModel'
    },
    hrId: String,
    location: String,
    Description: String,
    name: String,
    salary: String

});

module.exports = jobSchema;