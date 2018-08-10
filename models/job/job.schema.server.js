const mongoose = require('mongoose');


const jobSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'CompanyModel'
    },
    hrId: String,
    location: String,
    description: String,
    name: String,
    salary: String

}, {collection: 'jobs'});

module.exports = jobSchema;