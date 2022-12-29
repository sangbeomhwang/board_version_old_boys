const pool = require("./db");

exports.findOne = async (userData) => {
  const {
    user_id,
    user_pw,
    user_name,
    user_nickname,
    user_birth,
    user_gender,
    user_mobile,
    user_email,
  } = userData;
  const idcheck = `SELECT * FROM user WHERE user_id = '${user_id}'`;
  try {
    const result = await pool.query(idcheck);
    const userId = { user_id };
    if (result[0][0].user_id === userId.user_id) {
      return { error: "Error" };
    }
  } catch (error) {
    const user = `INSERT INTO user (user_id, user_pw, user_name, user_nickname, user_birth, user_gender, user_mobile, user_email) VALUES ('${user_id}', '${user_pw}', '${user_name}', '${user_nickname}', '${user_birth}', '${user_gender}', '${user_mobile}', '${user_email}')`;
    return await pool.query(user);
  }
};

exports.findInfo = async (user_id) => {
  // const { user_id, user_name, user_nickname, user_birth, user_gender, user_mobile, user_email } = userInfo;
  const sql = `SELECT * FROM user WHERE user_id = '${user_id}'`;
  const [[result]] = await pool.query(sql);
  return result;
};

exports.modifyInfo = async (userInfo, userID) => {
  const {
    user_id,
    user_pw,
    user_name,
    user_nickname,
    user_birth,
    user_mobile,
    user_email,
  } = userInfo;
  const modify = `UPDATE user SET user_id = '${user_id}', user_pw = '${user_pw}', user_name = '${user_name}', user_nickname = '${user_nickname}', user_birth = '${user_birth}', user_mobile = '${user_mobile}', user_email = '${user_email}' WHERE user_id = '${userID}'`;
  const [result] = await pool.query(modify);
  console.log(result);
  return result;
};

exports.findId = async (user) => {
  const { user_id } = user;
  const idcheck = `SELECT * FROM user WHERE user_id = '${user_id}';`;
  // console.log(idcheck)
  const userId = { user_id };
  // console.log(result[0][0].user_id)
  // console.log(userId.user_id
  return await pool.query(idcheck);
};

// exports.findUser = async (user) => {
//   const usersql = `SELECT * FROM board WHERE user_id = '${user_id}'

// }

exports.findLogin = async (userInfo) => {
  const { user_id, user_pw } = userInfo;
  const check = `select * from user where user_id = '${user_id}' and user_pw = '${user_pw}';`;
  const [[result]] = await pool.query(check);
  // console.log(result);
  return result;
};

// this.findLogin(obj)

// exports.findUser = async (userInfo) => {
//     const {id, password} = userInfo;
//   const userInfo = `SELECT * FROM user where user_id = "${user_id}" and user_pw ="${user_pw}"`;
//   const [result] = await pool.query(userInfo, [id, password]);
//   return result;
// };

// this.findUser('web77333').then(data=>console.log(data))

// exports.findLogin = async ({where}) => {
//     try {
//         const payload = Object.entries(where)
//         .map(([key, value]) => `${key} ='${value}'`)
//         .join(" and ")
//         const sql = `SELECT * FROM user WHERE ${payload}`
//         const [[result]] = await pool.query(sql);
//         return result;
//     } catch (e) {
//         console.error(e)
//     }
// }

// const obj = {
//     where : {
//         user_id : "web77222",
//         user_pw : "12341234",
//     }
// };

// this.findLogin(obj);

// this.findOne(1).then(data=>console.log(data))

// insert into user (
//     user_id, user_pw, user_name, user_nickname, user_birth, user_gender, user_mobile, user_email
// ) values (
//     'web77222', '12341234', 'testnick', 'testalt', '1979-01-12', 'male', '01012341236', 'test2@test.com'
// );
