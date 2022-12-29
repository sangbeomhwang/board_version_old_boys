const express = require("express");
const router = express.Router();
const controller = require("../controllers/board.controller");

router.get("/list", controller.getList);
router.get("/view", controller.getView);
router.post("/view", controller.postView);
router.get("/write", controller.getWrite);
router.post("/write",controller.postWrite);
router.get("/modify", controller.getModify);
router.post('/modify', controller.postModify);
// router.post('/delete', controller.postDelete);
router.get('/delete',controller.getDelete)
router.post('/delete', controller.postDelete2);

module.exports = router;
