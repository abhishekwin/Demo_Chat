const router = require("express").Router();
const user = require("../controler/message.controller");
const { checkTokenExpirationAndVerification } = require("../../middlewares/tokenExpiration");

router.use("/sendMsg",checkTokenExpirationAndVerification, user.sendMessage);
router.use("/getMsg",checkTokenExpirationAndVerification,user.getMessage)

module.exports = router;
