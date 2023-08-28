const router = require("express").Router();
const chat = require("../controler/chat.controler");
const { checkTokenExpirationAndVerification } = require("../../middlewares/tokenExpiration");


router.use("/create_chat", checkTokenExpirationAndVerification,chat.create_chat);
router.use("/addUsers",checkTokenExpirationAndVerification,chat.addUsers)
router.use("/getChats",checkTokenExpirationAndVerification,chat.getChats)


module.exports = router;
