const { Router } = require("express");

const userRouter = Router();

const { hashPass, comparePass } = require("../middleware/auth");

const { signupUser, getAllUsers, login, getOneUser } = require("./controllers");

userRouter.post("/users/signup", hashPass, signupUser);
userRouter.get("/users/getusers", getAllUsers);
userRouter.get("/users/getuser/:username", getOneUser);

// userRouter.post("/users/login", login, comparePass);
userRouter.post("/users/login", login);
userRouter.post("/users/comparepass", comparePass);

module.exports = userRouter;
