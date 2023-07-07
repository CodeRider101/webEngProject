import axios from 'axios';
import highScoreSchema from '../models/highscoreSchema.js';
import cookieParser from 'cookie-parser';
let rightGuessString;
let tries = 0;
let start;
let end;



async function getRightGuess(length){
  const options = {
    method: 'GET',
    url: 'https://random-word-api.herokuapp.com/word',
    params: {length: length, lang: 'en'}
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
    rightGuessString=response.data[0];
  } catch (error) {
    console.error(error);
  }
}

export const gameStart = async(req, res)=>{
    getRightGuess(req.body.length);
    res.status(200).send("started");
    console.log("started");
    tries=0;
    start = Date.now();
}

export const check = async (req, res) => {
    const wordLength = req.query.length;
    const guess = req.query.guess;
    const options = {
    method: 'GET',
    url: 'https://random-word-api.herokuapp.com/word',
    params: {number: 100000000, length: wordLength, lang: 'en'}
    };
    try {
    const response = await axios.request(options);
    let i = 0;
    let found = false;
    let resultCheck;
    let score;
    if(guess === rightGuessString){
        tries++;
        resultCheck= "correct";
        found=true;

        end = Date.now();
        let time = (end-start)/1000; 
        console.log(time + " seconds");
        let wordLengthCalc = wordLength*100000;
        tries = (tries+4)*1000;
        time*=6;
        score = (wordLengthCalc/(tries+(time)))*100;
        console.log(score);
        score = score.toFixed(0);
        console.log("Score: "+ score);
        if(req.query.username != undefined){
          console.log("Username: "+ req.query.username)
          let date = new Date().toISOString();
          console.log(date);
          let scoreEntry = new highScoreSchema({
            username: req.query.username,
            score: score,
            date: date,
            wordLength: wordLength
          })
          try{
            scoreEntry.save();
            console.log("Safed to Database.");gud
          }catch(err){
            console.log(err);
          }
        }else{
          console.log("Dumm?")
        }

        

        tries=0;
    }
    while(!found){
        
        if(response.data[i] === guess){
        resultCheck= "inList";
        found=true;
        tries++;
        break;
        }else if(response.data[i] === undefined){
        break;
        }
        i++;
    }
    console.log(tries);
    let rightGuessArray = Array.from(rightGuessString);
    let guessArray = Array.from(guess);
    let letterColor = ["gray", "gray", "gray", "gray", "gray"];
    if(!found){
        resultCheck= "notInList";
    }

    else{
        //check green
        for (let i = 0; i < wordLength; i++) {
        if (rightGuessArray[i] == guessArray[i]) {
            letterColor[i] = "green";
            rightGuessArray[i] = "#";
        }
        }
        //check yellow
        //checking guess letters
        for (let i = 0; i < wordLength; i++) {
        if (letterColor[i] == "green") continue;

        //checking right letters
        for (let j = 0; j < wordLength; j++) {
            if (rightGuessArray[j] == guessArray[i]) {
            letterColor[i] = "yellow";
            rightGuessArray[j] = "#";
            }
        }
        }

        let correct = false;
        if (guess === rightGuessString) {
        correct = true;
        }
    }
    let result = [];
    result.push(resultCheck);
    result.push(letterColor);
    result.push(score);
    let resultJSON= JSON.stringify(result);
    console.log(resultJSON);
    res.json(resultJSON);
    } catch (error) {
        console.error(error);
    }
};