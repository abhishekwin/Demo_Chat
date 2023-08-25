const apiRouter = require("express").Router();

const router = require("../router/user.route");
const chatRoute = require("../router/chat.route")

apiRouter.use("/user", router);
apiRouter.use("/chat",chatRoute)


module.exports = apiRouter;