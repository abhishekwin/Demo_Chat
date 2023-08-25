const router = require("express").Router();
const chat = require("../controler/chat.controler");


router.use("/create_chat", chat.create_chat);


module.exports = router;
