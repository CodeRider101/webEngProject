// Import function to set theme from cookie
import { setThemeFromCookie } from "./darkmode.js";

import { getCookieValue, setCookie } from "./cookies.js";

// Add event listener to sign out button
let signOutButton = document.getElementById("signOutButton");
signOutButton.addEventListener("click", (e) => {
    document.cookie = "username = ";
    alert("You have been signed out. You will be redirected to the main page.");
    setTimeout(function () {
        window.location.href = "index.html";
    }, 500);
});

// Add event listeners
let buttonChangePassword = document.getElementById("buttonChangePassword");
buttonChangePassword.addEventListener("click", (e) => {
    changePassword();
});

let buttonChangeUsername = document.getElementById("buttonChangeUsername");
buttonChangeUsername.addEventListener("click", (e) => {
    changeUsername();
});

// Change the password
async function changePassword() {
    ;
    const username = getCookieValue("username");
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const newPasswordConfirm =
        document.getElementById("newPasswordConfirm").value;
    const securityAnswer = document.getElementById("securityAnswer").value;
    const securityQuestion = document.getElementById("securityQuestion").value;

    if (newPassword === newPasswordConfirm && username != "Not Acceptable") {
        await fetch(`http://localhost:8000/api/users/changePassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                username,
                currentPassword,
                newPassword,
                securityQuestion,
                securityAnswer,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                } else {
                    //redirect to main
                    alert("You changed your password successfully");
                }
            })
            .then((json) => {
                console.log(json);
            })
            .catch((e) => {
                const error = e.message;
                console.error(error);
                document.getElementById("securityAnswer").value = error;
                alert("The security answer is wrong!");
            });
    } else {
        alert("Your password didn't match the confirm password!");
    }
}

// Change the username, if it is not the same as the old one or already taken
async function changeUsername() {
    const newUsername = document.getElementById("newUsernameValue").value;
    const currentUsername = getCookieValue("username");

    if (newUsername === currentUsername) {
        alert("Your new username can't be the old username!");
    } else {
        fetch(`http://localhost:8000/api/users/changeUsername`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                currentUsername,
                newUsername,
            }),
        })
            .then((response) => {
                ;
                if (!response.ok) {
                    throw new Error(response.statusText);
                } else {
                    alert("You changed your username successfully");
                    document.cookie = "username = " + newUsername;
                    document.getElementById("username").innerHTML = newUsername;
                }
            })
            .then((json) => {
                console.log(json);
            })
            .catch((e) => {
                const error = e.message;
                console.error(error);
                document.getElementById("uname").value = error;
                alert("The username is already taken!");
            });
    }
}
