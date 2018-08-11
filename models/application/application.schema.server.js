const mongoose = require('mongoose');

const applicationModel = {
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobModel'},
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'},
    hrId: String
};

const applicationSchema = mongoose.Schema(applicationModel, {collection: 'applications'});

module.exports = applicationSchema;