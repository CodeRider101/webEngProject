//Import function to set the theme from the cookie
import { setThemeFromCookie } from "./darkmode.js";

import {
    startConfetti,
    stopConfetti,
    openModal,
    closeModal,
} from "./confetti.js";
import { createPopUp } from "./popUp.js";
import { getCookieValue } from "./cookies.js";

const wordle = document.getElementById("wordle");
let menuOpen = false;
let NUMBER_OF_GUESSES = 6;
let WORD_LENGTH = 5;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let darkModeEnabled;
let popUp;
let checking = false;

// Set a boolean depending on the cookie value
if (document.cookie.match(/theme=dark/) != null) {
    darkModeEnabled = true;
}

// Create a greeting pop up if the user has not logged in or signed up 
document.addEventListener("DOMContentLoaded", function () {
    if (getCookieValue("username") === "") {
        createPopUp("Hey", [
            "This is a special edition of the game wordle.",
            "You can either Sign Up or Log In (if you already have an account) to save your highscores and compare yourself with the best players in the whole word or you play for free without any saves.",
            "Keep in mind that your data will be stored securely and will not be passed on to third parties!",
            "With this edition you can set the word length of the words to be searched for in the game settings. You can also choose the word length with which you want to compare yourself with others on the leaderboard. But beware! It's not about the length, it's about the best time and the number of attempts.",
            "When you find any bugs please write anyone of us an e-mail. You can find our mails in the 'Contact Us' Tab.",
            "Now have fun while playing!!",
        ]);
    } else {
        console.log(document.cookie);
    }
});

// Start the game and set a new word in the backend();
const start = () => {
    fetch(`http://localhost:8000/api/game/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            length: WORD_LENGTH,
        }),
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        })
        .catch((err) => console.log(err));
};

//Start the game when the page is loaded
document.addEventListener("DOMContentLoaded", initBoard);
//Delete and enter button
document.getElementById("deleteButton").addEventListener("click", deleteLetter);
document.getElementById("enterButton").addEventListener("click", checkGuess);

//Initialize the board with the right number of rows and boxes
function initBoard() {
    let board = document.getElementById("game-board");

    // Get the cookie value for the word length
    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("wLength="))
        ?.split("=")[1];
    // If the cookie value is defined set the word length to the cookie value
    if (cookieValue !== undefined) {
        NUMBER_OF_GUESSES = parseInt(cookieValue) + 1;
        guessesRemaining = NUMBER_OF_GUESSES;
        WORD_LENGTH = cookieValue;
    }

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";

        for (let j = 0; j < WORD_LENGTH; j++) {
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }

        board.appendChild(row);
    }
    start();
}

//Colors one key on the keyboard
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

//Deletes the last letter in the box of the current guess
function deleteLetter() {
    let row =
        document.getElementsByClassName("letter-row")[
            NUMBER_OF_GUESSES - guessesRemaining
        ];
    if (nextLetter !== 0) {
        let box = row.children[nextLetter - 1];
        box.textContent = "";
        box.classList.remove("filled-box");
        currentGuess.pop();
        nextLetter -= 1;
    }
}

//Checks the current guess based on the result from the backend and colors the boxes accordingly
async function checkGuess() {
    let row =
        document.getElementsByClassName("letter-row")[
            NUMBER_OF_GUESSES - guessesRemaining
        ];
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
    // Get the result from the backend
    await fetch(
        `http://localhost:8000/api/game/check?guess=${guessString}&length=${WORD_LENGTH}&username=${getCookieValue(
            "username"
        )}`
    )
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            result = JSON.parse(json);
            letterColor = result[1];
            if (result[0] == "notInList") {
                exists = false;
            } else if (result[0] == "correct") {
                correct = true;
            }
        });
    if (!exists) {
        toastr.error("Word not in list!");
        for (let i = 0; i < WORD_LENGTH; i++) {
            deleteLetter();
        }
        return;
    }

    //Animate the boxes and change the color
    for (let i = 0; i < WORD_LENGTH; i++) {
        let box = row.children[i];
        let delay = 250 * i;
        setTimeout(() => {
            //flip box
            animateCSS(box, "flipInX");
            //shade box
            letterColor.forEach((color, index) => {
                if (color === "yellow") {
                    letterColor[index] = "#ffbf00";
                } else if (darkModeEnabled && color === "gray") {
                    letterColor[index] = "#404245";
                }
            });

            box.style.backgroundColor = letterColor[i];
            shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
        }, delay);
    }

    // If the guess is correct, show the congratulations modal and start the confetti
    if (correct) {
        guessesRemaining = 0;
        openModal(result[2]);
        startConfetti();
        checking = false;
        return;
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;
        checking = false;

        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!");
        }
    }
}

//Inserts a letter in the next box
function insertLetter(pressedKey) {
    popUp = document.getElementById("popup");
    if (nextLetter === WORD_LENGTH || popUp.style.visibility == "visible") {
        return;
    }
    pressedKey = pressedKey.toLowerCase();

    let row =
        document.getElementsByClassName("letter-row")[
            NUMBER_OF_GUESSES - guessesRemaining
        ];
    let box = row.children[nextLetter];
    animateCSS(box, "pulse");
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

//Animates the boxes
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
        if (darkModeEnabled) {
            borderColor = "#fff";
        } else {
            borderColor = "#333";
        }
        node.style.setProperty("border-color", borderColor);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve("Animation ended");
        }

        node.addEventListener("animationend", handleAnimationEnd, {
            once: true,
        });
    });

// Event listeners for the keyboard    
document.addEventListener("keyup", (e) => {
    popUp = document.getElementById("popup");
    if (guessesRemaining === 0) {
        return;
    }

    let pressedKey = String(e.key);
    if (pressedKey === "Backspace") {
        deleteLetter();
        return;
    }

    if (pressedKey === "Enter" && popUp.style.visibility != "visible" && checking == false) {
        checkGuess();
        checking = true;
        return;
    }

    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
        return;
    } else {
        insertLetter(pressedKey);
    }
});

// Event listener for the keyboard buttons
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

// let menu = document.querySelector('#menu-icon');
// let navBar = document.querySelector('.navbar');


// function wordLength() {
//     let wordLength = document.getElementById("wordLength").value;
//     if (wordLength < 3 || wordLength > 9) {
//         toastr.error("Please enter a number between 3 and 9");
//         p;
//     } else {
//         NUMBER_OF_GUESSES = parseInt(wordLength) + 1;
//         WORD_LENGTH = wordLength;
//         restart();
//     }
// }

// menu.addEventListener('click', () => {
//   menu.classList.toggle('bx-x');
//   navBar.classList.toggle('open');

//   if(navBar.classList.contains('open')) {
//     document.getElementById('wordle').style.zIndex = '-1';
//  } else {
//      document.getElementById('wordle').style.zIndex = '0';
//  }
// });


// Restart the game according to the current settings
function restart() {
    closeModal();
    stopConfetti();
    const rows = document.getElementsByClassName("letter-row");
    while (rows.length > 0) {
        rows[0].parentNode.removeChild(rows[0]);
    }
    const boxes = document.getElementsByClassName("letter-box");
    while (boxes.length > 0) {
        boxes[0].parentNode.removeChild(boxes[0]);
    }

    initBoard();
    guessesRemaining = NUMBER_OF_GUESSES;
    currentGuess = [];
    nextLetter = 0;
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (darkModeEnabled) {
            elem.style.backgroundColor = "#74787c";
        } else {
            elem.style.backgroundColor = "#F0F0F0";
        }
    }
}

// Event listeners for the restart buttons
let newGame = document.getElementById("newGame");
newGame.addEventListener("click", restart, true);
let newGame2 = document.getElementById("newGame2");
newGame2.addEventListener("click", restart, true);
