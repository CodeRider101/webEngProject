import express from "express";
//import functions:
import { login, signup } from "../controllers/loginController.js";

//create Router from express
const loginRouter = express.Router();

loginRouter.post("/signUp", signup);
loginRouter.post("/login", login);

export default loginRouter;
