module.exports = function(app){
    app.get('/api/application',findApplicationsForUserLoggedIn);
    app.get('/api/admin/application',findApplicationsAdmin);
    app.post('/api/application',makeApplication);
    app.delete('/api/application',cancelApplication);
    app.delete('/api/admin/application',cancelApplicationAdmin);

    const applicationModel = require('../models/application/application.model.server');
    const jobModel = require('../models/job/job.model.server');
    const userModel = require('../models/user/user.model.server');

    const _filter = {'password':0, '__v':0};
    function findApplicationsForUserLoggedIn(req, res){
        const {userId} = req.cookies;
        // console.log(userId);
        if(!userId){
            console.log('user is not logged in');
            return res.json({code:1});
        }

        userModel.findUserById({_id:userId},_filter)
            .then(user=>{
                let status = user.status;
                if(status === 'applicant'){
                    applicationModel
                        .findApplicationsForApplicant(userId)
                        .then(function(application){
                            // console.log(application);
                            res.json({code:0, data:application});
                        });

                } else if(status === 'HR'){
                    applicationModel
                        .findApplicationsForHR(userId)
                        .then(function(application){
                            // console.log(application);
                            res.json({code:0, data:application});
                        });

                }
            });
    }

    function findApplicationsAdmin(req, res){
        const {userId} = req.cookies;
        // console.log(userId);
        if(!userId){
            console.log('user is not logged in');
            return res.json({code:1});
        }

        return userModel.findUserById({_id:userId},_filter)
            .then(user=>{
                let status = user.status;
                if(status === 'admin'){
                    applicationModel
                        .findApplicationsForAdmin()
                        .then(function(applications){
                            // console.log(application);
                            return res.json({code:0, data:applications});
                        });

                } else {
                    return res.json({code:1});
                }
            });
    }


    function makeApplication(req, res){
        const userId = req.cookies.userId;
        if(!userId){
            console.log('user is not loggedin');
            return res.json({code:1});
        }
        const jobId = req.body.jobId;
        return jobModel.findJobById(jobId)
            .then(job => {
                if(job === null){
                    res.sendStatus(403);
                }
                let application = {
                    job: jobId,
                    applicant: userId,
                    hrId: job.hrId
                };
                return applicationModel
                    .checkDuplicate(application)
                    .then(result => {
                        if(result === 0){
                            applicationModel.makeApplication(application)
                                .then((ap)=>{
                                    return res.json(ap);
                                });

                        } else {
                            res.sendStatus(403);
                        }
            })
        })
    }


    function cancelApplication(req, res){
        const userId = req.cookies.userId;
        if(!userId){
            console.log('user is not loggedin');
            return res.json({code:1});
        }
        const jobId = req.body.jobId;
        return jobModel.findJobById(jobId)
            .then(job => {
                if(job === null){
                    res.sendStatus(403);
                }
                let application = {
                    job: jobId,
                    applicant: userId,
                    hrId: job.hrId
                };
                return applicationModel
                    .cancelApplication(application)
                    .then((application)=>{
                        return res.json(application);
                    });
            })
    }

    function cancelApplicationAdmin(req, res){
        const userId = req.cookies.userId;
        if(!userId){
            console.log('user is not loggedin');
            return res.json({code:1});
        }
        const jobId = req.body.jobId;
        const applicantId = req.body.applicantId;
        return jobModel.findJobById(jobId)
            .then(job => {
                if(job === null){
                    res.sendStatus(403);
                }
                let application = {
                    job: jobId,
                    applicant: applicantId,
                    hrId: job.hrId
                };
                return applicationModel
                    .cancelApplication(application)
                    .then((application)=>{
                        return res.json(application);
                    });
            })
    }

};