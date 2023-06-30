import express from 'express';
//import User functions
import { getSecurityQuestion, resetPassword } from "../controllers/userController.js";

//create Router from express
const userRouter = express.Router();

userRouter.post("/resetPassword", resetPassword);
userRouter.post("/getSecurityQuestion", getSecurityQuestion);

export default userRouter;