const Router = require("express");
const {
  signup,
  signin,
  logout,
  refresh,
} = require("../controllers/auth/auth.controller");

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/logout", logout);
authRouter.get("/refresh", refresh);

module.exports = authRouter;
