
let menuOpen = false;
let NUMBER_OF_GUESSES = 6;
let WORD_LENGTH = 5;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;

// start the game and sets a new word in the backend();
const start = () => {
  fetch(`http://localhost:8000/start?length=${WORD_LENGTH}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
    })
    .catch(err => console.log(err))
}

start();
//initializes the board with the right number of rows and boxes
function initBoard() {
  let board = document.getElementById("game-board");

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

initBoard();
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
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
}
//checks the current guess based on the result from the backend and colors the boxes accordingly 
async function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";
 
  for (const val of currentGuess) {
    guessString += val;
  }

  console.log(guessString);
  if (guessString.length != WORD_LENGTH) {
    toastr.error("Not enough letters!");
    return;
  }

  let exists = true;
  let correct = false;
  let letterColor;
  await fetch(`http://localhost:8000/check?guess=${guessString}&length=${WORD_LENGTH}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      let result = JSON.parse(json);
      letterColor = result[1];
      if(result[0] == 'notInList'){
        exists=false;
      }else if(result[0] == 'correct'){
        correct=true;
      }
    })
    console.log(letterColor);
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
      box.style.backgroundColor = letterColor[i];
      shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
    }, delay);
  }

  if (correct) {
    toastr.success("You guessed right! Game over!");
    guessesRemaining = 0;
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
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
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
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
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

function wordLength() {
  let wordLength = document.getElementById('wordLength').value;
  if (wordLength < 3 || wordLength > 9) {
    toastr.error("Please enter a number between 3 and 9");
  } else {

    const rows = document.getElementsByClassName("letter-row");
    while(rows.length > 0){
      rows[0].parentNode.removeChild(rows[0]);
    }
    const boxes = document.getElementsByClassName("letter-box");
    while(boxes.length > 0){
      boxes[0].parentNode.removeChild(boxes[0]);
    }

    NUMBER_OF_GUESSES = parseInt(wordLength) + 1;
    WORD_LENGTH = wordLength;
    guessesRemaining = NUMBER_OF_GUESSES;
    currentGuess = [];
    nextLetter = 0;
    initBoard();
    start();
  }
}

let submit  = document.getElementById('submit');
submit.addEventListener('click', wordLength, true);


let menu = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');

menu.addEventListener('click', () => {
  menu.classList.toggle('bx-x');
  navBar.classList.toggle('open');
});

function restart() {
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
      elem.style.backgroundColor = "#F0F0F0";
    }

  console.log(NUMBER_OF_GUESSES)
  console.log(WORD_LENGTH)
  console.log(guessesRemaining)
  console.log(currentGuess)
  console.log(nextLetter)
}

let newGame  = document.getElementById('newGame');
newGame.addEventListener('click', restart, true);