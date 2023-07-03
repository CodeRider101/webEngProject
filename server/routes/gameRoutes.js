import express from 'express';
//Import functions from Controller
import { check, gameStart } from '../controllers/gameController.js';

const gameRouter = express.Router();

gameRouter.post("/", gameStart);
gameRouter.get("/check", check );

export default gameRouter;