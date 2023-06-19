const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const cors = require('cors');
const port = 8000;

app.use(cors());

app.get('/word', async (req, res) => {
  const length = req.query.length;
  const options = {
    method: 'GET',
    url: 'https://random-word-api.herokuapp.com/word',
    params: {length: '5', lang: 'en'}
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data[0]);
    rightGuessString=response.data[0];
  } catch (error) {
    console.error(error);
  }
})

app.get('/check', async (req, res) => {
  const wordle = Array.from(req.query.word);
  const wordleString = req.query.word;
  const length = req.query.length;
  const guess = req.query.guess;
  const currentGuess = req.query.currentGuess;
  const options = {
    method: 'GET',
    url: 'https://random-word-api.herokuapp.com/word',
    params: {number: 100000000, length: length, lang: 'en'}
  };

  // var letterColor = ["gray", "gray", "gray", "gray", "gray"];

  try {
    const response = await axios.request(options);
    let i =0;
    let found = false;
    while(!found){
      
      if(response.data[i] === guess){
        res.json("inList");
        found=true;
        break
      }else if(response.data[i] === undefined){
        break;
      }
      i++;
    }
    if(!found){
      res.json("undefined");
    }
    // else{
    //   //check green
    //   for (let i = 0; i < 5; i++) {
    //     if (wordle[i] == currentGuess[i]) {
    //       letterColor[i] = "green";
    //       wordle[i] = "#";
    //     }
    //   }
    //   //check yellow
    //   //checking guess letters
    //   for (let i = 0; i < length; i++) {
    //     if (letterColor[i] == "green") continue;

    //     //checking right letters
    //     for (let j = 0; j < length; j++) {
    //       if (wordle[j] == currentGuess[i]) {
    //         letterColor[i] = "yellow";
    //         wordle[j] = "#";
    //       }
    //     }
    //   }

    //   let correct = false;
    //   if (guess === wordleString) {
    //     correct = true;
    //   }
    // }
  } catch (error) {
    console.error(error);
  }
})

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});