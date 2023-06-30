import express, { response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import loginRouter from './routes/loginRoutes.js';
import highScoreSchema from './models/highScoreSchema.js';

const app = express();
const port = 8000;
let tries = 0;
let start;
let end;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);


mongoose.connect('mongodb+srv://jere_YT:rIG0jourr6rrUlng@vtordle-data.n0naebt.mongodb.net/'
)
.then(() => {
  app.listen(port);
  console.log('Server is running on port ' + port);
  console.log('Connected to the database!')
}).catch(() => {
    console.log('Connection failed!')
});

let rightGuessString;

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

app.get('/start', async (req, res) => {
  getRightGuess(req.query.length);
  res.status(200).send("started");
  console.log("started");
  tries=0;
  start = Date.now();
});
app.get('/check', async (req, res) => {
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
    if(guess === rightGuessString){
      tries++;
      resultCheck= "correct";
      found=true;

      end = Date.now();
      let time = (end-start)/1000; 
      console.log(time + " seconds");
      let score = (wordLength/(tries*(time*0,2)))*10000;
      score = score.toFixed(0);
      console.log("Score: "+ score);
      let scoreEntry = new highScoreSchema({
        score: score,
        date: Date.now()
      })
      try{
        scoreEntry.save();
      }catch(err){
        console.log(err);
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
    let resultJSON= JSON.stringify(result);
    console.log(resultJSON);
    res.json(resultJSON);
  } catch (error) {
    console.error(error);
  }
});

