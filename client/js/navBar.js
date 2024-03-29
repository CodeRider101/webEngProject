// If a user is logged in, the username will be displayed in the navbar
function checkIfLoggedIn() {
    if (getCookieValue("username") !== "") {
        document.getElementById("signIn").style.display = "none";
        document.getElementById("userInfo").style.display = "block";
        document.getElementById("username").innerHTML =
            getCookieValue("username");
    } else {
        document.getElementById("userInfo").style.display = "none";
        document.getElementById("signIn").style.display = "block";
    }
}

function getCookieValue(a) {
    const b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

// Toggle the navbar on mobile
let menu = document.querySelector("#menu-icon");
let navBar = document.querySelector(".navbar");
if (menu) {
    menu.addEventListener("click", () => {
        menu.classList.toggle("bx-x");
        navBar.classList.toggle("open");

        //Index.html
        let wordle = document.getElementById("wordle");
        //Leaderboard
        let leaderboard = document.getElementById("leaderboardDiv");
        //Settings.html
        let settings = document.getElementById("settingsDiv");
        //Impressum
        let impressum = document.getElementById("impressumDiv");

        if (navBar.classList.contains("open")){
            if (wordle) {
                wordle.style.zIndex = "-1";
            } else if (leaderboard) {
                leaderboard.style.zIndex = "-1";
            } else if (settings) {
                settings.style.zIndex = "-1";
            } else if (impressum) {
                impressum.style.zIndex = "-1";
            }
        } else {
            if (wordle) {
                wordle.style.zIndex = "0";
            } else if (leaderboard) {
                leaderboard.style.zIndex = "0";
            } else if (settings) {
                settings.style.zIndex = "0";
            } else if (impressum) {
                impressum.style.zIndex = "0";
            }
        }
    });
}

// If the login popup is opened, it will be in front of the other content
function openPopup() {
    let popup = document.getElementById("popup");
    let overlay = document.getElementById("overlay");

    //Index.html
    let wordle = document.getElementById("wordle");
    //Leaderboard
    let leaderboard = document.getElementById("leaderboardDiv");
    //Settings.html
    let settings = document.getElementById("settingsDiv");
    //Impressum
    let impressum = document.getElementById("impressumDiv");

    if (wordle) {
        wordle.style.zIndex = "-1";
    } else if (leaderboard) {
        leaderboard.style.zIndex = "-1";
    } else if (settings) {
        settings.style.zIndex = "-1";
    } else if (impressum) {
        impressum.style.zIndex = "-1";
    }
    popup.style.visibility = "visible";
    popup.style.opacity = "1";

    overlay.classList.add("active");

    //set autoFocus on username Inputfield
    document.getElementById("uname").focus();

    const login = document.getElementById("logInButton");
    if (login) {
        ;
        login.addEventListener("click", function () {
            //Import the login Javascript
            import("../js/logIn.js")
                .then((module) => {
                    //Script loaded successfully
                    //Import our module
                    module.checkLogin();
                })
                .catch((error) => {
                    // Error while loading the script
                    console.error("Error loading script:", error);
                });
        });
    }
}

// Close the login popup
function closePopup() {
    let popup = document.getElementById("popup");
    let overlay = document.getElementById("overlay");

    popup.style.visibility = "hidden";
    popup.style.opacity = "0";

    //Index.html
    const wordle = document.getElementById("wordle");
    //Leaderboard
    const leaderboard = document.getElementById("leaderboardDiv");
    //Settings.html
    let settings = document.getElementById("settingsDiv");
    //Impressum
    const impressum = document.getElementById("impressumDiv");

    if (wordle) {
        wordle.style.zIndex = "0";
    } else if (leaderboard) {
        leaderboard.style.zIndex = "0";
    } else if (settings) {
        settings.style.zIndex = "0";
    } else if (impressum) {
        impressum.style.zIndex = "0";
    }

    overlay.classList.remove("active");
}

// Add event listeners to the navbar and set the active tab
window.onload = function () {
    let homeTab = document.getElementById("home");
    let leaderBoardTab = document.getElementById("leaderboard");
    let settingsTab = document.getElementById("settings");
    let contactUsTab = document.getElementById("contactUs");
    if (homeTab) {
        homeTab.addEventListener("click", () => {
            homeTab.classList.add("active");
            leaderBoardTab.classList.remove("active)");
            settingsTab.classList.remove("active)");
            contactUsTab.classList.remove("active)");
        });
    }
    if (leaderBoardTab) {
        leaderBoardTab.addEventListener("click", () => {
            homeTab.classList.remove("active");
            leaderBoardTab.classList.add("active)");
            settingsTab.classList.remove("active)");
            contactUsTab.classList.remove("active)");
        });
    }
    if (settingsTab) {
        settingsTab.addEventListener("click", () => {
            homeTab.classList.remove("active");
            leaderBoardTab.classList.remove("active)");
            settingsTab.classList.add("active)");
            contactUsTab.classList.remove("active)");
        });
    }
    if (contactUsTab) {
        contactUsTab.addEventListener("click", () => {
            contactUsTab.classList.toggle("active)");
            homeTab.classList.remove("active");
            leaderBoardTab.classList.remove("active)");
            settingsTab.classList.remove("active)");
        });
    }
};
