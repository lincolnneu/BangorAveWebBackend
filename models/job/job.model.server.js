const mongoose = require('mongoose');
const jobSchema = require('./job.schema.server');
const jobModel = mongoose.model('JobModel', jobSchema);
function findAllJobs() {
    return jobModel.find({})
        .populate('company')
        .exec();
}

function createJob(job) {
    return jobModel.create(job);
}

function deleteJobById(jobId) {
    return jobModel.remove({_id: jobId});
}

function updateJobById(job) {
    // console.log(job);
    return jobModel.findOneAndUpdate({_id: job._id}, {$set: job})
}

function findJobsForCompany(companyId) {
    return jobModel.find({company: companyId})
        .populate('company')
        .exec();
}

function findJobsForHR(hrId) {
    return jobModel.find({hrId: hrId})
        .populate('company')
        .exec();
}

function findJobById(jobId){
    return jobModel.findOne({_id: jobId});
}


api = {
    findAllJobs: findAllJobs,
    createJob: createJob,
    deleteJobById: deleteJobById,
    updateJobById: updateJobById,
    findJobsForHR: findJobsForHR,
    findJobsForCompany: findJobsForCompany,
    findJobById: findJobById
};

module.exports = api;


