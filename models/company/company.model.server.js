var mongoose = require('mongoose');
var companySchema = require('./company.schema.server');
var companyModel = mongoose.model('CompanyModel', companySchema)

// function findUserByCredentials(credential) {
//   return userModel.findOne(credential, {username: 1});
// }  

// function findUserById(userId) {
//   return userModel.findById(userId);
// }

function createCompany(company) {
  return companyModel.create(company);
}

// function findAllUsers() {
//   return userModel.find();
// }

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

var api = {
  createCompany: createCompany
//   findAllUsers: findAllUsers,
//   findUserById: findUserById,
//   findUserByCredentials: findUserByCredentials,
//   updateUser: updateUser
};

module.exports = api;
