import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import mongoose from 'mongoose';
import userSchema from './models/userSchema.js';
import mongooseErrorHandler from './mongooseErrorHandler.js';

const app = express();
const port = 8000;

mongoose.connect('mongodb+srv://jere_YT:rIG0jourr6rrUlng@vtordle-data.n0naebt.mongodb.net/'
).then(() => {
    console.log('Connected to the database!')

}).catch(() => {
    console.log('Connection failed!')
});

app.use(cors());

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
    let i =0;
    let found = false;
    let resultCheck;
    if(guess === rightGuessString){
      resultCheck= "correct";
      found=true;
    }
    while(!found){
      
      if(response.data[i] === guess){
        resultCheck= "inList";
        found=true;
        break;
      }else if(response.data[i] === undefined){
        break;
      }
      i++;
    }
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

app.get('/createUser', async (req, res) => {
  try{
    const result = await userSchema.create({
      username: req.query.username,
      password: req.query.password
    })
    return res.status(200).json(result);
  }catch(e){
    res.status(406).json(mongooseErrorHandler(e));
  }
});

app.get('/logIn', async (req, res) => {
  try{
    const result = await userSchema.findOne({
      username : req.query.username
    })
    //found an user?
    if(result){
      //correct password?
      if(result.password === req.query.password){
        return res.status(200).json(result);
      }else{
        //error : wrong password
        return res.status(400).json({error: "You entered a wrong password..\nPlease try again or press 'forgot password."});
      }
    //error : wrong username
    }else{
      return res.status(400).json({error : "The user you entered is not given."});
    }
  }catch(e){
    res.status(400).json(e);
  }
});


app.get('/test', async (req, res) => {
  try{
    const result = await userSchema.create({
      username: "ijksd",
      password: "ijssdj"
    })
    return res.status(200).json(result);
  }catch(e){
    console.log(e);
  }
});

app.get('/test2', async (req, res) => {
  try{
    const result = await userSchema.findOne({
      username: "ijksd"
    })
    return res.status(200).json(result);
  }catch(e){
    console.log(e);
  }
});

app.get('/test3', async (req, res) => {
  try{
    const result = await userSchema.updateOne(
      {username: "ijksd"},
      {username : "jesuuusu"}
      )
    return res.status(200).json(result);
  }catch(e){
    console.log(e);
  }
});

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});