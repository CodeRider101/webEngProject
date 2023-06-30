import express from 'express';
//Import functions from Controller
import { checkWord } from '../controllers/gameController';

const gameRouter = express.Router();

gameRouter.get("/", );
gameRouter.get("/check",checkWord )

export default gameRouter;