const Router = require("express");
const userRouter = Router();
const { getUsersController } = require("../controllers/user/user.controller");
const verifyToken = require("../middleware/auth.middleware")

userRouter.get("/users", verifyToken, getUsersController);

module.exports = userRouter;
