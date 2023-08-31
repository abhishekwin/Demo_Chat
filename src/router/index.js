const apiRouter = require("express").Router();

const router = require("../router/user.route");
const chatRoute = require("../router/chat.route")
const msgRoute = require("../router/message.route")

apiRouter.use("/user", router);
apiRouter.use("/chat",chatRoute)
apiRouter.use("/msg",msgRoute)



module.exports = apiRouter;