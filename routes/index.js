const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.index);
router.get("/sign-up", controller.signUpGet);
router.post("/sign-up", controller.signUpPost);
router.get("/log-in", controller.logInGet);
router.post("/log-in", controller.logInPost);
router.get("/log-out", controller.logOut);
router.get("/join-club", controller.joinClubGet);
router.post("/join-club", controller.joinClubPost);
router.get("/new-message", controller.newMessageGet);
router.post("/new-message", controller.newMessagePost);
router.post("/message/:id/delete", controller.deleteMessage);
router.post("/message/:id/like", controller.toggleLike);

module.exports = router