module.exports = function (app) {


    app.post('/api/job', createJob);
    app.get('/api/job', findAllJobs);
    app.delete('/api/job/:jobId', deleteJob);
    app.put('/api/job', updateJobById);
    app.get('/api/job/company/:companyId', findJobsForCompany);
    app.get('/api/job/hr/:hrId', findJobsForHR);

    const jobModel = require('../models/job/job.model.server');


    function createJob(req, res) {
        const job = req.body;
        // console.log(job);
        jobModel.createJob(job)
            .then(
                () => res.json(job)
            )
    }

    function findAllJobs(req, res) {
        jobModel.findAllJobs()
            .then(job => res.json(job))
    }

    function deleteJob(req, res) {
        const jobId = req.params['jobId'];
        jobModel.deleteJobById(jobId)
            .then(
                () => res.json({code: 0})
            )
    }

    function updateJobById(req, res) {
        const job = req.body;
        jobModel.updateJobById(job)
            .then((job) => res.json(job));
    }

    function findJobsForCompany(req, res) {
        const company = req.params['companyId'];
        jobModel.findJobsForCompany(company)
            .then(jobs => {
                // console.log(jobs);
                res.json(jobs)
            });
    }

    function findJobsForHR(req, res) {
        const hr = req.params['hrId'];
        jobModel.findJobsForHR(hr)
            .then(jobs => {
                // console.log(jobs);
                res.json(jobs)
            });
    }


};