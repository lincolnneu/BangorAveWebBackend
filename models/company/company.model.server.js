const mongoose = require('mongoose');
const companySchema = require('./company.schema.server');
const companyModel = mongoose.model('CompanyModel', companySchema);


function createCompany(company) {
    return companyModel.create(company);
}

function findCompanyByName(companyName) {
    // console.log(company);
    return companyModel.findOne({companyName: companyName});
}

function findAllCompany() {
    return companyModel.find({});
}

function updateCompany(company) {
    const companyName = company.companyName;
    return companyModel.findOneAndUpdate({companyName: companyName}, {$set: company})
}


// function updateUser(user) {
//     return userModel.update({username: user.username},
//       {
//         $set: {
//           username: user.username,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           phone: user.phone,
//           address: user.address
//         }
//       });
//   }

const api = {
    createCompany: createCompany,
    findCompanyByName: findCompanyByName,
    findAllCompany: findAllCompany,
    updateCompany: updateCompany
};

module.exports = api;
