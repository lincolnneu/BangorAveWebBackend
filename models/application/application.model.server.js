//grab mongoose
const mongoose = require('mongoose');
const applicationSchema = require('./application.schema.server');

const applicationModel = mongoose.model('applicationModel', applicationSchema);

function makeApplication(application){
    return applicationModel.create(application);
}

function cancelApplication(application){
    return applicationModel.deleteOne(application);
}

function findApplicationsForApplicant(userId){
    return applicationModel
        .find({applicant: userId})
        .populate('job')
        .exec();
}

function findApplicationsForHR(userId){
    return applicationModel
        .find({hrId: userId})
        .populate('job')
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