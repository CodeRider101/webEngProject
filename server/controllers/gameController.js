import axios from "axios";
import highScoreSchema from "../models/highscoreSchema.js";
let rightGuessString;
let tries = 0;
let start;
let end;
//gets new word from the word api and saves it in rightGuessString
async function getRightGuess(length) {
    const options = {
        method: "GET",
        url: "https://random-word-api.herokuapp.com/word",
        params: { length: length, lang: "en" },
    };

    try {
        const response = await axios.request(options);
        rightGuessString = response.data[0];
    } catch (error) {
        console.error(error);
    }
}

//starts the game 
export const gameStart = async (req, res) => {
    getRightGuess(req.body.length);
    res.status(200).send("started");
    tries = 0;
    start = Date.now();
};

//checks a guess and returns the if the word is correct and the color of the letters and the score if the word is correct
export const check = async (req, res) => {
    const wordLength = req.query.length;
    const guess = req.query.guess;
    const options = {
        method: "GET",
        url: "https://random-word-api.herokuapp.com/word",
        params: { number: 100000000, length: wordLength, lang: "en" },
    };
    try {
        const response = await axios.request(options);
        let i = 0;
        let found = false;
        let resultCheck;
        let score;
        if (guess === rightGuessString) {
            tries++;
            resultCheck = "correct";
            found = true;
            //calculate score
            end = Date.now();
            let time = (end - start) / 1000;
            let wordLengthCalc = wordLength * 100000;
            tries = (tries + 4) * 1000;
            time *= 6;
            score = (wordLengthCalc / (tries + time)) * 100;
            score = score.toFixed(0);
            if (req.query.username != undefined) {
                //save to database
                let date = new Date().toISOString();
                let scoreEntry = new highScoreSchema({
                    username: req.query.username,
                    score: score,
                    date: date,
                    wordLength: wordLength,
                });
                try {
                    scoreEntry.save();
                    gud;
                } catch (err) {
                    console.log(err);
                }
            } 

            tries = 0;
        }
        //checks if the word exists
        while (!found) {
            if (response.data[i] === guess) {
                resultCheck = "inList";
                found = true;
                tries++;
                break;
            } else if (response.data[i] === undefined) {
                break;
            }
            i++;
        }

        let rightGuessArray = Array.from(rightGuessString);
        let guessArray = Array.from(guess);
        //sets the color of the letters
        let letterColor = ["gray", "gray", "gray", "gray", "gray"];
        if (!found) {
            resultCheck = "notInList";
        } else {
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
        //pushes everything in result
        let result = [];
        result.push(resultCheck);
        result.push(letterColor);
        result.push(score);
        let resultJSON = JSON.stringify(result);
        res.json(resultJSON);
    } catch (error) {
        console.error(error);
    }
};
