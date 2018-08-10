const userSchema = require('./user.schema.server');
const utils = require('utility');
const UserModel = userSchema.getModel('user');

function findUsersByStatus({status}){
    return UserModel.find({status});
}

function findAllUsers(){
    return UserModel.find();
}

function findUserByIdAndUpdate(userId, body){
    return UserModel.findByIdAndUpdate(userId, body);
}

function findUserByCredentials({user, password},_filter){
    // console.log({user, password:md5Pwd(password)});
    let result = UserModel.findOne({user, password:md5Pwd(password)},_filter);
    // console.log(result);
    return result;
}

function md5Pwd(pwd){
    const salt = 'cs5610_team6_938$%#%@*/-+`~';
    return utils.md5(utils.md5(pwd+salt));
}

function findUserByUsername({user:user}){
    return UserModel.findOne({user:user});
}

function createUser(user, password,status, avatar){
        const userModel = new UserModel({user,password:md5Pwd(password),status, avatar});
        // Since create cannot get user id, we switch to save.
        return userModel.save();
}

function findUserById({_id:userId}, _filter){
    return UserModel.findOne({_id:userId}, _filter);
}

var api = {
    findUsersByStatus: findUsersByStatus,
    findUserByIdAndUpdate: findUserByIdAndUpdate,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername:findUserByUsername,
    findAllUsers: findAllUsers,
    createUser: createUser,
    findUserById: findUserById
}

module.exports = api;