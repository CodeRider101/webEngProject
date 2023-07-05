import highScoreSchema from '../models/highscoreSchema.js';
import cookieParser from 'cookie-parser';

export const leaderboardOnInnit = async(req, res)=>{
    res.status(200).send("started");
    

    try{
        console.log(document.cookie);
        const { username } = req.query.username;
        const result = await highScoreSchema.findOne({
          username
        })
        console.log(result.username);
        console.log(result.score);
        console.log(result.username);
        
      }catch(e){
        res.status(400).json(e);
      }
}

