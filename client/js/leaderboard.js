import { setThemeFromCookie } from "./darkmode.js";

// let menu = document.querySelector('#menu-icon');
let navBar = document.querySelector(".navbar");
let wordLength = 5;
let timeSpan = "All time";
let output = document.getElementById("outputScore");
let slider = document.getElementById("sliderScore");

// When the page is loaded, add event listeners and load the leaderboard
window.onload = function () {
    slider.addEventListener("change", updateSlider, false);
    document.getElementById("sliderScore").setAttribute("value", wordLength);
    document.getElementById("outputScore").textContent = wordLength;
    document
        .querySelector(".selectLeaderboard")
        .addEventListener("click", (e) => {
            if (
                !e.target.textContent.includes("\n") &&
                timeSpan !== e.target.textContent
            ) {
                timeSpan = e.target.textContent;
                const leaderboardElements = document.querySelectorAll(
                    ".selectLeaderboard li"
                );
                leaderboardElements.forEach((element) => {
                    if (element !== e.target) {
                        element.innerHTML = element.textContent;
                    } else {
                        element.innerHTML = `<b>${element.textContent}</b>`;
                    }
                });
                loadOverallBest(wordLength, timeSpan);
            }
        });
    loadOverallBest(wordLength, timeSpan);
    loadPersonalBest(wordLength);
};

function getCookieValue(a) {
    const b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

// Fetch the leaderboard data from the server and find a users best score
async function findBest(user, wordLength, personal, timeSpan) {
    try {
        const response = await fetch(
            `http://localhost:8000/api/leaderboard/?username=${user}&wordLength=${wordLength}&personal=${personal}&timeSpan=${timeSpan}`
        );
        if (response.ok) {
            const json = await response.json();
            return json;
        } 
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
}

// Load the personal best scores from the server and display them
async function loadPersonalBest(wordLength) {
    const personalContainer = document.getElementById("personalContainer");
    //delete all previous data
    personalContainer.innerHTML = "";
    if (getCookieValue("username") == "") {
        const text = document.createElement("div");
        text.setAttribute("class", "text");
        text.innerHTML = "Please Log In for a Personal Best!";
        personalContainer.appendChild(text);
    } else {
        const data = await findBest(
            getCookieValue("username"),
            wordLength,
            "true",
            "nothing here"
        );
        let i = 1;
        for (const entry of data) {
            const row = document.createElement("div");
            row.setAttribute("class", "row");
            const place = document.createElement("div");
            place.setAttribute("class", "place");
            let p = "1";
            switch (i) {
                case 1:
                    p = "1st";
                    break;
                case 2:
                    p = "2nd";
                    break;

                case 3:
                    p = "3rd";
                    break;

                case 4:
                    p = "4th";
                    break;

                case 5:
                    p = "5th";
                    break;
            }
            place.innerHTML = p;
            const score = document.createElement("div");
            score.setAttribute("class", "score");
            score.innerHTML = entry.score;

            const date = document.createElement("div");
            date.setAttribute("class", "date");
            date.innerHTML =
                entry.date.slice(8, 10) +
                "." +
                entry.date.slice(5, 7) +
                "." +
                entry.date.slice(0, 4) +
                "     " +
                entry.date.slice(11, 16) +
                "Uhr";
            row.appendChild(place);
            row.appendChild(score);
            row.appendChild(date);
            personalContainer.appendChild(row);
            i++;
        }
    }
}

// Load the overall best scores from the server and display them
async function loadOverallBest(wordLength, timeSpan) {
    const data = await findBest("xxx", wordLength, "false", timeSpan);

    const overallContainer = document.getElementById("overallContainer");
    //delete all previous data
    overallContainer.innerHTML = "";

    let i = 1;
    for (const entry of data) {
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        const place = document.createElement("div");
        place.setAttribute("class", "place");
        let p = 1;
        switch (i) {
            case 1:
                p = "1st";
                break;
            case 2:
                p = "2nd";
                break;

            case 3:
                p = "3rd";
                break;

            case 4:
                p = "4th";
                break;

            case 5:
                p = "5th";
                break;
        }
        place.innerHTML = p;

        const username = document.createElement("div");
        username.setAttribute("class", "username");
        if (entry.username == getCookieValue("username")) {
            username.innerHTML = `<i>${entry.username}</i>`;
        } else {
            username.innerHTML = entry.username;
        }

        const score = document.createElement("div");
        score.setAttribute("class", "score");
        score.innerHTML = entry.score;

        const date = document.createElement("div");
        date.setAttribute("class", "date");
        date.innerHTML =
            entry.date.slice(8, 10) +
            "." +
            entry.date.slice(5, 7) +
            "." +
            entry.date.slice(0, 4) +
            "     " +
            entry.date.slice(11, 16) +
            "Uhr";
        row.appendChild(place);
        row.appendChild(username);
        row.appendChild(score);
        row.appendChild(date);
        overallContainer.appendChild(row);

        i++;
    }
}

// If the menu is opened, it will be in front of the leaderboard
menu.addEventListener("click", () => {
    menu.classList.toggle("bx-x");
    navBar.classList.toggle("open");

    if (navBar.classList.contains("open")) {
        document.getElementById("leaderboardDiv").style.zIndex = "-1";
    } else {
        document.getElementById("leaderboardDiv").style.zIndex = "0";
    }
});

// Word length slider to change the word length of the portrayed data
function updateSlider() {
    wordLength = document.getElementById("sliderScore").value;
    output.textContent = wordLength;
    loadPersonalBest(wordLength);
    loadOverallBest(wordLength, timeSpan);
}
