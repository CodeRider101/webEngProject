import express from 'express';
//import User functions
import { getSecurityQuestion, resetPassword, changePassword, changeUsername } from "../controllers/userController.js";

//create Router from express
const userRouter = express.Router();

userRouter.post("/resetPassword", resetPassword);
userRouter.post("/getSecurityQuestion", getSecurityQuestion);
userRouter.post("/changePassword", changePassword);
userRouter.post("/changeUsername", changeUsername);

export default userRouter;