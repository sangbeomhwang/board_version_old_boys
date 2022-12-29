const express = require("express");
const router = express.Router();
const controller = require("../controllers/join.controller");

router.get("/join", controller.getJoin);
router.post("/join", controller.postJoin);
router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);
router.get("/welcome", controller.getWelcome);
router.post("/welcome", controller.postWelcome);
router.get("/profile", controller.getProfile);
router.post("/profile", controller.postProfile);
router.get("/logout", controller.logout);
router.get("/idcheck", controller.getIdCheck);
router.post("/idcheck", controller.postIdCheck);

module.exports = router;
