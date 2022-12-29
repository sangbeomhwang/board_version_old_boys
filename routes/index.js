const express = require("express");
const router = express.Router();
const board = require("./board.route");
const join = require("./join.route");

router.get("/", (req, res) => {
  if (req.cookies.token) {
    res.render("index.html", { token: req.cookies.token });
  } else {
    res.render("index.html");
  }
});

router.use("/board", board);
router.use("/join", join);

module.exports = router;
