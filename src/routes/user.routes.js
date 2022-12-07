const Router = require("express");
const userRouter = Router();
const { getUsersController } = require("../controllers/user/user.controller");

userRouter.get("/users", getUsersController);

module.exports = userRouter;
