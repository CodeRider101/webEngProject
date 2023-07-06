import { setThemeFromCookie } from './darkmode.js';

const signUp = document.getElementById("signUp");
if(signUp){
  console.log("Sign Up");
  signUp.addEventListener("submit", checkSignUp);
}

async function checkSignUp(event) {
    event.preventDefault();
    const username = document.getElementById('uname').value;
    const password = document.getElementById('psw').value;
    const confirmPassword = document.getElementById('psw2').value;
    const securityAnswer = document.getElementById('securityAnswer').value;
    const securityQuestion = document.getElementById('securityQuestion').value;
  
  
    if(password === confirmPassword && username != "Not Acceptable"){
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
        securityAnswer
      }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }else{
            document.cookie = "username=" + username;
            //redirect to main
            confirm("You created an account. You will get redirected to the Game :)\nHave fun!");
            window.location.href= '../html/index.html';
          }
        })
        .then(json=>{
          console.log(json);
        })
        .catch(e => {
          const error = e.message;
          console.error(error);
          document.getElementById('uname').value = error;
          alert("This Username is already taken. Please choose another one!")
        });
    }else{
      alert("Your password didn't match the Confirmpassword!");
    }
  }