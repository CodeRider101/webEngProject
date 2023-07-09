import { setThemeFromCookie } from "./darkmode.js";

// If the page is opened, add an event listener to the form
const signUp = document.getElementById("signUp");
if (signUp) {
    console.log("Sign Up");
    signUp.addEventListener("submit", checkSignUp);
}

// Check whether the password and the confirm password match and whether the username is already taken. If so, the user is created.
async function checkSignUp(event) {
    event.preventDefault();
    const username = document.getElementById("signUpUsername").value;
    const password = document.getElementById("signUpPw").value;
    const confirmPassword = document.getElementById("signUpPw2").value;
    const securityAnswer = document.getElementById("securityAnswer").value;
    const securityQuestion = document.getElementById("securityQuestion").value;

    if (password === confirmPassword && username != "Not Acceptable") {
        console.log("fetch");
        await fetch(`http://localhost:8000/api/login/signUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                username,
                password,
                securityQuestion,
                securityAnswer,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                } else {
                    document.cookie = "username=" + username;
                    //redirect to main
                    confirm(
                        "You created an account. You will get redirected to the Game :)\nHave fun!"
                    );
                    window.location.href = "../html/index.html";
                }
            })
            .then((json) => {
                console.log(json);
            })
            .catch((e) => {
                const error = e.message;
                console.error(error);
                document.getElementById("uname").value = error;
                alert(
                    "This Username is already taken. Please choose another one!"
                );
            });
    } else {
        alert("Your password didn't match the confirm password!");
    }
}
