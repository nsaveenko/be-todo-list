const Router = require("express");
const todoRouter = require("./todo.routes");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");

const router = Router();

router.use(todoRouter);
router.use(authRouter);
router.use(userRouter);

module.exports = router;