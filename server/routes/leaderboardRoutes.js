import express from "express";
import { leaderboardOnInnit } from "../controllers/leaderboardController.js";

const leaderboardRouter = express.Router();

leaderboardRouter.get("/", leaderboardOnInnit);

export default leaderboardRouter;