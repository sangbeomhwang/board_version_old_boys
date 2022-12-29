const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const router = require("./routes");
const cookieParser = require("cookie-parser");
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const FileStore = require('session-file-store')

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);
// app.use(bodyParser.urlencoded({ extended : false}));
// app.use(session({
//     secret: '테스트해보자',
//     resave : false,
//     saveUninitialized: true,
//     store: new FileStore()
// }))

app.use((error, req, res, next) => {
  console.error(error, error.message);
  res.send(`
<script type="text/javascript>
    alert('${error.message}');
    history.back();
</script>
`);
});

app.listen(3000, () => {
  console.log("server start");
});
