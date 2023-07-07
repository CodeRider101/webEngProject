import { setThemeFromCookie } from './darkmode.js';
import { startConfetti, stopConfetti, openModal, closeModal } from './confetti.js';
import { createPopUp } from './popUp.js';

const wordle = document.getElementById('wordle');
let menuOpen = false;
let NUMBER_OF_GUESSES = 6;
let WORD_LENGTH = 5;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let darkModeEnabled;
const popUp = document.getElementById("popup");

if(document.cookie.match(/theme=dark/) != null) {
  darkModeEnabled = true;
}

window.onload = (event) => {
  if(document.cookie){
    createPopUp("Hey!", ["This is a special edition of the classic game \"Wordle\".", "You can either Sign Up or Log In (if you already have an account) to save your highscores and compare yourself with the best players in the whole word or you play for free without any saves.", "Keep in mind that your data will be stored securely and will not be passed on to third parties!", "With this edition you can set the word length of the words to be searched for in the game settings. You can also choose the word length with which you want to compare yourself with others on the leaderboard. But beware! It's not about the length, it's about the best time and the number of attempts.", "In the unlikely event that you find any bugs, please feel free to contact us. You can find our mails in the 'Contact Us' Tab.", "Now have fun while playing!!"]);
  }else{
    console.log(document.cookie)
  }
};

document.addEventListener("DOMContentLoaded", () => {
    if(getCookieValue('username') !== ""){
      document.getElementById('logIn').style.display = 'none';
      document.getElementById('userInfo').style.display='block';
      document.getElementById('username').innerHTML = getCookieValue('username');
    }else{
      document.getElementById('userInfo').style.display='none';
      document.getElementById('logIn').style.display = 'block';
    }
});

function getCookieValue(a) {
  const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

// start the game and sets a new word in the backend();
const start = () => {
  fetch(`http://localhost:8000/api/game/`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      length: WORD_LENGTH
    }),
  })
    .then(response => response.json())
    .then(json => {
      console.log(json)
    })
    .catch(err => console.log(err))

}

let newGame  = document.getElementById('newGame');
newGame.addEventListener('click', restart, true);

let newGame2  = document.getElementById('newGame2');
newGame2.addEventListener('click', restart, true);

//delete, enter button
document.addEventListener("DOMContentLoaded", initBoard);
document.getElementById("deleteButton").addEventListener("click", deleteLetter);
document.getElementById("enterButton").addEventListener("click", checkGuess)


//initializes the board with the right number of rows and boxes
function initBoard() {
  let board = document.getElementById("game-board");
  
  // Get the cookie value for the word length
  const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("wLength="))
      ?.split("=")[1];
  if (cookieValue !== undefined) {
  NUMBER_OF_GUESSES = parseInt(cookieValue) + 1;
  guessesRemaining = NUMBER_OF_GUESSES;
  WORD_LENGTH = cookieValue;
  }

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
      let row = document.createElement("div")
      row.className = "letter-row"
      
      for (let j = 0; j < WORD_LENGTH; j++) {
          let box = document.createElement("div")
          box.className = "letter-box"
          row.appendChild(box)
      }

      board.appendChild(row)
  }
  start();
}

//colors one key on the keyboard 
function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === "green") {
        return;
      }

      if (oldColor === "yellow" && color !== "green") {
        return;
      }

      elem.style.backgroundColor = color;
      break;
    }
  }
}
//deletes the last letter in the box and the current guess
function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
  if(nextLetter !== 0){
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
  }
}
//checks the current guess based on the result from the backend and colors the boxes accordingly 
async function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
  let guessString = "";
 
  for (const val of currentGuess) {
    guessString += val;
  }

  if (guessString.length != WORD_LENGTH) {
    toastr.error("Not enough letters!");
    return;
  }

  let exists = true;
  let correct = false;
  let letterColor;
  let result;
  await fetch(`http://localhost:8000/api/game/check?guess=${guessString}&length=${WORD_LENGTH}&username=${getCookieValue('username')}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      result = JSON.parse(json);
      letterColor = result[1];
      if(result[0] == 'notInList'){
        exists=false;
      }else if(result[0] == 'correct'){
        correct=true;
      }
    });
    if(!exists){
      toastr.error("Word not in list!");
      for(let i=0; i<WORD_LENGTH; i++){
        deleteLetter();
      }
      return;
    }
  for (let i = 0; i < WORD_LENGTH; i++) {
    let box = row.children[i];
    let delay = 250 * i;
    setTimeout(() => {
      //flip box
      animateCSS(box, "flipInX");
      //shade box
      letterColor.forEach ((color, index) => {
        if(color === "yellow"){
          letterColor[index] = "#ffbf00";
        } else if(darkModeEnabled && color === "gray"){
          letterColor[index] = "#404245";
        }
      });
      
      box.style.backgroundColor = letterColor[i];
      shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
    }, delay);
  }

  if (correct) {
    guessesRemaining = 0;
    openModal(result[2]);
    startConfetti();
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
      toastr.error("You've run out of guesses! Game over!");
      //toastr.info(`The right word was: "${rightGuessString}"`);
    }
  }
}
//inserts a letter in the next box
function insertLetter(pressedKey) {
  if (nextLetter === WORD_LENGTH || popUp.style.visibility == 'visible') {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];  
  let box = row.children[nextLetter];
  animateCSS(box, "pulse");
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
}
//animates the boxes
const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element;
    node.style.setProperty("--animate-duration", "0.3s");

    node.classList.add(`${prefix}animated`, animationName);

    // Adapt border color (after animation) to dark mode or light mode
    let borderColor;
    if(darkModeEnabled){
      borderColor = "#fff";
    }else{
      borderColor = "#333";
    }
    node.style.setProperty("border-color", borderColor);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace") {
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter" && popUp.style.visibility != 'visible') {
    checkGuess();
    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }
  let key = target.textContent;

  if (key === "Del") {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

let menu = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');

function wordLength() {
  let wordLength = document.getElementById('wordLength').value;
  if (wordLength < 3 || wordLength > 9) {
    toastr.error("Please enter a number between 3 and 9");p
  } else {
    NUMBER_OF_GUESSES = parseInt(wordLength) + 1;
    WORD_LENGTH = wordLength;
    restart();
  }
}

menu.addEventListener('click', () => {
  menu.classList.toggle('bx-x');
  navBar.classList.toggle('open');

  if(navBar.classList.contains('open')) {
    document.getElementById('wordle').style.zIndex = '-1';
 } else {
     document.getElementById('wordle').style.zIndex = '0';
 }
});

function restart() {
  closeModal();
  stopConfetti();
  const rows = document.getElementsByClassName("letter-row");
    while(rows.length > 0){
      rows[0].parentNode.removeChild(rows[0]);
    }
    const boxes = document.getElementsByClassName("letter-box");
    while(boxes.length > 0){
      boxes[0].parentNode.removeChild(boxes[0]);
    }
    
  initBoard();
  guessesRemaining = NUMBER_OF_GUESSES;
  currentGuess = [];
  nextLetter = 0;
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if(darkModeEnabled){
      elem.style.backgroundColor = "#74787c";
    } else {
      elem.style.backgroundColor = "#F0F0F0";
    }
  }
}

