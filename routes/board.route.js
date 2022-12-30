const express = require("express");
const router = express.Router();
const controller = require("../controllers/board.controller");

router.get("/list", controller.getList);
router.post("/list", controller.postList);
router.get("/view", controller.getView);
router.post("/add_comment", controller.postView);

router.post('/like', controller.postLike);
router.get("/write", controller.getWrite);
router.post("/write",controller.postWrite);
router.get("/modify", controller.getModify);
router.post('/modify', controller.postModify);
router.get('/delete',controller.getDelete)
router.post('/delete', controller.postDelete);

module.exports = router;
