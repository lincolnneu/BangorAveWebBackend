module.exports = function(app){
    app.get('/api/application',findApplicationsForUserLoggedIn);
    app.post('/api/application',makeApplication);
    app.delete('/api/application',cancelApplication);

    const applicationModel = require('../models/application/application.model.server');
    const jobModel = require('../models/job/job.model.server');
    function findApplicationsForUserLoggedIn(req, res){
        const {userId, status} = req.cookies;
        if(!userId){
            console.log('user is not logged in');
            return res.json({code:1});
        }
        if(status === 'applicant'){
            applicationModel
                .findApplicationsForApplicant(userId)
                .then(function(application){
                    console.log(application);
                    res.json({code:0, data:application});
                });

        } else if(status === 'HR'){
            applicationModel
                .findApplicationsForHR(userId)
                .then(function(application){
                    console.log(application);
                    res.json({code:0, data:application});
                });

        }
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

};