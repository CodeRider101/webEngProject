const WORDS = ["testt", "hello", "horny", "morny", "steam", "build", "cat", "dog", "cow", "pig", "rat", "bat", "sap", "steep", "gains", "saucy"];


let rightGuessString;

const getWordle = () => {
  fetch(`http://localhost:8000/word?length=${WORD_LENGTH}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      rightGuessString = json
    })
    .catch(err => console.log(err))
}

let menuOpen = false;
let NUMBER_OF_GUESSES = 6;
let WORD_LENGTH = 5;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;

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
  getWordle();
}

initBoard();

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

function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
}

async function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);
  console.log(rightGuessString)
 
  for (const val of currentGuess) {
    guessString += val;
  }

  console.log(guessString);
  if (guessString.length != WORD_LENGTH) {
    toastr.error("Not enough letters!");
    return;
  }

  let exists = true;
  await fetch(`http://localhost:8000/check?guess=${guessString}&length=${WORD_LENGTH}&word=${rightGuessString}&currentGuess=${currentGuess}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if(json == 'undefined'){
        exists=false;
      }
    })
    if(!exists){
      toastr.error("Word not in list!");
      for(let i=0; i<WORD_LENGTH; i++){
        deleteLetter();
      }
      return;
    }

  var letterColor = ["gray", "gray", "gray", "gray", "gray"];

  //check green
  for (let i = 0; i < 5; i++) {
    if (rightGuess[i] == currentGuess[i]) {
      letterColor[i] = "green";
      rightGuess[i] = "#";
    }
  }

  //check yellow
  //checking guess letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (letterColor[i] == "green") continue;

    //checking right letters
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (rightGuess[j] == currentGuess[i]) {
        letterColor[i] = "yellow";
        rightGuess[j] = "#";
      }
    }
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

  if (guessString === rightGuessString) {
    toastr.success("You guessed right! Game over!");
    guessesRemaining = 0;
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
      toastr.error("You've run out of guesses! Game over!");
      toastr.info(`The right word was: "${rightGuessString}"`);
    }
  }
}

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
    getWordle();
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
      elem.style.backgroundColor = "white";
    }

  console.log(NUMBER_OF_GUESSES)
  console.log(WORD_LENGTH)
  console.log(guessesRemaining)
  console.log(currentGuess)
  console.log(nextLetter)
}

let newGame  = document.getElementById('newGame');
newGame.addEventListener('click', restart, true);