const join = require('../repository/join.repository')

exports.postJoin = async(userData) => {
    const result = await join.findOne(userData)
    return result
}

exports.getLogin = async({user_id, user_pw}) => {
    // const where = {user_id, user_pw};
    const user = await join.findUser();
    return user;
}

exports.postLogin = async(userInfo) => {
    const result = await join.findLogin(userInfo)
    return result;
}

exports.postIdCheck = async(userId) => {
    const result = await join.findId(userId);
    return result;
}

exports.getProfile = async(userInfo) => {
    const result = await join.findInfo(userInfo);
    return result;
}

exports.postProfile = async(userInfo, userID) => {
    const result = await join.modifyInfo(userInfo, userID)
    return result;
}