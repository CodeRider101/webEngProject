import axios from 'axios';

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

export const checkWord = async (req, res) => {
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
};