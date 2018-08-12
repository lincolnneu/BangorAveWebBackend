//grab mongoose
const mongoose = require('mongoose');
const applicationSchema = require('./application.schema.server');

const applicationModel = mongoose.model('applicationModel', applicationSchema);
const companySchema = require('../company/company.schema.server');
const companyModel = mongoose.model('CompanyModel', companySchema);
const jobSchema = require('../job/job.schema.server');
const jobModel = mongoose.model('JobModel', jobSchema);
function makeApplication(application){
    return applicationModel.create(application);
}

function cancelApplication(application){
    return applicationModel.deleteOne(application);
}

function findApplicationsForApplicant(userId){
    console.log('finding applications for ' + userId);
    return applicationModel
        .find({applicant: userId})
        .populate({
            path:'job',
            populate:{
                path:'company'
            }
        })
        .exec();
}

function findApplicationsForHR(userId){
    return applicationModel
        .find({hrId: userId})
        .populate({
            path:'job',
            populate:{
                path:'company'
            }
        })
        .populate('applicant')
        .exec();
}

function checkDuplicate(application){
    return applicationModel.findOne(application)
        .then(res => {
            if(res === null){
                // Not duplicate.
                return new Promise(
                    function (resolve, reject){
                        resolve(0);
                    }
                );
            } else {
                // duplicate
                return new Promise(
                    function (resolve, reject){
                        resolve(1);
                    }
                );
            }
        } );
}

api = {
    makeApplication: makeApplication,
    cancelApplication: cancelApplication,
    findApplicationsForApplicant: findApplicationsForApplicant,
    findApplicationsForHR: findApplicationsForHR,
    checkDuplicate: checkDuplicate
};

module.exports = api;