import highScoreSchema from '../models/highscoreSchema.js';
import cookieParser from 'cookie-parser';

export const leaderboardOnInnit = async(req, res)=>{
    try{
        const { username, wordLength, personal } = req.query;
        let result;
        if (personal == "true"){
          result = await highScoreSchema.find({
            username: username,
            wordLength: wordLength
          })
        }
        else{
          result = await highScoreSchema.find({
            wordLength: wordLength
          })
        }
        
        result = sortLeaderboard(result);
        console.log(result);
        return res.json(result);
      }catch(e){
        res.status(400).json(e);
        console.log(e);
      }
}
function sortLeaderboard(result){
  result.sort((a, b) => {
    return b.score - a.score; 
  });
  result = result.slice(0, 5);
  return result;
}

