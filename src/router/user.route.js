const router = require("express").Router();
const user = require("../controler/user.controler");
// const { checkTokenExpirationAndVerification } = require("../../middleware");
// const { userValidation } = require("../validation");
// const userPassword = require("../controllers/user.controller");

router.use("/sign_up", user.create);
router.use("/get_users", user.get_users);
router.use("/login", user.login);
router.use("/update_user",user.update_User)
// router.use("/verify_user", checkTokenExpirationAndVerification,user.verifySeller);

// router.use("/forget_password", userPassword.forget_Password);
// router.use("/reset_password", userPassword.reset_Password);
module.exports = router;
