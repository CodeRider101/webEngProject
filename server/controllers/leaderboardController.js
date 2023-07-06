import highScoreSchema from '../models/highscoreSchema.js';
import cookieParser from 'cookie-parser';


export const leaderboardOnInnit = async(req, res)=>{
    try{
        const { username, wordLength, personal, timeSpan } = req.query;
        let result;
        if (personal == "true"){
          result = await highScoreSchema.find({
            username: username,
            wordLength: wordLength
          })
        }else if(timeSpan === "All time"){
          result = await highScoreSchema.find({
            wordLength: wordLength,
          })
        }
        else{
          result = await highScoreSchema.find({
            wordLength: wordLength,
            date: { $gte: calculateDate(timeSpan) } 

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


function calculateDate(timeSpan) {
  const currentDate = new Date();
  console.log(currentDate + "hihihihohoho");

  // Calculate the date based on the timeSpan
  if (timeSpan === "Daily") {
    currentDate.setDate(currentDate.getDate() - 1);
    console.log(currentDate.getDate() + "hier");
    console.log("day");
    
  } else if (timeSpan === "Hourly") {
    console.log("hour");
    currentDate.setHours(currentDate.getHours() - 1);
    console.log(currentDate.getHours() + "hier");

  } else if (timeSpan === "Weekly") {
    console.log("week");
    currentDate.setDate(currentDate.getDate() - 7);
    console.log(currentDate.getDate() + "hier");

  } else if (timeSpan === "Monthly") {
    console.log("month");
    currentDate.setMonth(currentDate.getMonth() - 1);
    console.log(currentDate.getMonth() + 1 + "hier");

  }
  console.log(currentDate.toUTCString() + "ahhhhhh");
  return currentDate.toUTCString();
}

