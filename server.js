const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of the Express application
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('local/index.html', { root: __dirname });
});

// Define the Wordle game handler
// app.post('/wordle', (req, res) => {
//   // Get the target word and the guessed word from the request body
//   const targetWord = req.body.targetWord;
//   const guessedWord = req.body.guessedWord;

//   // Validate the input
//   if (!targetWord || !guessedWord) {
//     return res.status(400).json({ error: 'Missing targetWord or guessedWord' });
//   }

//   // Ensure both words have the same length
//   if (targetWord.length !== guessedWord.length) {
//     return res.status(400).json({ error: 'Words must have the same length' });
//   }

//   // Perform the Wordle game logic
//   const result = performWordle(targetWord, guessedWord);

//   // Return the game result
//   res.json(result);
// });

// // Function to perform the Wordle game logic
// function performWordle(targetWord, guessedWord) {
//   const targetChars = targetWord.toLowerCase().split('');
//   const guessedChars = guessedWord.toLowerCase().split('');

//   let correctPositions = 0;
//   let correctLetters = 0;

//   for (let i = 0; i < targetChars.length; i++) {
//     if (targetChars[i] === guessedChars[i]) {
//       correctPositions++;
//     } else if (guessedChars.includes(targetChars[i])) {
//       correctLetters++;
//     }
//   }

//   const result = {
//     targetWord,
//     guessedWord,
//     correctPositions,
//     correctLetters,
//   };

//   return result;
// }

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
