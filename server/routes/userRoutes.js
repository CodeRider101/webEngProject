import express from 'express';
//import User functions
import { getAllUser, login, signup } from "../controllers/userController.js";

//create Router from express
const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/signUp", signup);
userRouter.post("/login", login)

export default userRouter;