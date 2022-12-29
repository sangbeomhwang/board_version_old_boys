const join_service = require("../services/join.service");

exports.getJoin = (req, res) => {
  res.render("join/join.html");
};

exports.postJoin = async (req, res) => {
  const userData = req.body;
  await join_service.postJoin(userData);
  const user = req.body;
  // console.log(req.body);
  try {
    res.setHeader("Set-Cookie", `token="${user.user_id}"; path=/;`);
    res.redirect("/join/welcome");
  } catch (error) {
    if (error.message.includes('아이디가 이미 존재합니다. 다른 아이디를 사용해주세요')) {
      res.redirect('/join/join');
    } else {
      // Handle other errors
    }
  }
};

exports.getLogin = (req, res) => {
  res.render("join/login.html");
};

exports.postLogin = async (req, res, next) => {
  const user = await join_service.postLogin(req.body);
  if (user === undefined){
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(`
    <html>
      <body>
        <script>
          alert("아이디와 패스워드가 일치하지 않습니다. 다시 확인해주세요")
          window.location.replace("/join/login")
        </script>
      </body>
    </html>
    `);
  }else {
  res.setHeader("Set-Cookie", `token="${user.user_id}"; path=/;`);
  res.redirect("/join/welcome");
  }
};

exports.getWelcome = async (req, res) => {
  res.render("join/welcome", { token: req.cookies.token });
};

exports.postWelcome = (req, res) => {
  res.redirect("/");
};

exports.getProfile = async (req, res) => {
  // const token = String(req.cookies.value);
  // for (const property in req.cookies) {
  //   console.log(property, req.cookies[property]);
  // }
  const token = Object.values(req.cookies).toString()
  const userInfo = await join_service.getProfile(token);
  // console.log(Object.values(req.cookies).toString())
  // console.log(userInfo)
  res.render("join/profile.html", { userInfo, token });
};

exports.postProfile = async (req, res) => {
  const token = Object.values(req.cookies).toString()
  req.body.user_id = token;
  const user = req.body;
  const result = await join_service.postProfile(user, token);
  // console.log('token :', token)
  // console.log('result: ', result)
  // console.log('req.body: ', req.body);
  // console.log('user.user_id :', user.user_id)
  res.setHeader("Set-Cookie", `token="${user.user_id}"; path=/;`);
  res.redirect("/");
}



exports.logout = async (req, res) => {
  res.setHeader("Set-Cookie", `token=; path=/;`);
  res.redirect("/");
};

exports.getIdCheck = (req, res) => {
  res.render("join/idcheck.html")
}

exports.postIdCheck = async (req,res,next) => {
  const [result] = await join_service.postIdCheck({ user_id: req.body.user_id });
  console.log(req.body.user_id);
  console.log(12)
  if (result.length !== 0) {
    console.log(13)
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(`
    <html>
      <body>
        <script>
          alert("중복된 아이디입니다. 다른 아이디를 사용해주세요")
          window.location.replace("/join/idcheck")
        </script>
      </body>
    </html>
    `);
  } else {
    console.log(14)
    res.setHeader("Set-Cookie", `token="${req.body.user_id}"; path=/;`);
  res.send(`
  <html>
    <body>
      <script>
        alert("중복된 아이디가 아닙니다. 사용 가능합니다.")
        window.close()
      </script>
    </body>
  </html>`)
  next(); 
} 
};



// exports.getIdCheck = (req,res) =>{
//   res.render()
// }

// exports.postLogin = async(req,res,next) => {
//     const {user_id, user_pw} = req.body;
//     const user = await join_service.getLogin({user_id,user_pw})

//     if(user === undefined){
//         return next (new Error("아이디와 패스워드가 일치하지 않습니다."))
//     }res.setHeader("Set-Cookie", `token=${user.user_id}; path=/;`)
//     res.redirect("/")
// }

// exports.welcome = (req,res) => {
//     res.redirect(`/join/welcome?index=${user_name}`)
// };
