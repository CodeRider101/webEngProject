
import { setThemeFromCookie } from './darkmode.js';
import { getCookieValue, setCookie } from './cookies.js';


let signOutButton = document.getElementById("signOutButton");
signOutButton.addEventListener("click", (e) => {
    document.cookie = "username = ";
    alert("You have been signed out. You will be redirected to the main page.");
    setTimeout(function(){ window.location.href = "index.html"; }, 500);
});


let buttonChangePassword = document.getElementById("buttonChangePassword");
buttonChangePassword.addEventListener("click", (e) => {
    changePassword();
});

let buttonChangeUsername = document.getElementById("buttonChangeUsername");
buttonChangeUsername.addEventListener("click", (e) => {
    changeUsername();
});


async function changePassword(){
    const username = getCookieValue('username');
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const newPasswordConfirm = document.getElementById('newPasswordConfirm').value;
    const securityAnswer = document.getElementById('securityAnswer').value;
    const securityQuestion = document.getElementById('securityQuestion').value;
  
  
    if(newPassword === newPasswordConfirm && username != "Not Acceptable"){
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
        securityAnswer
      }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }else{
            //redirect to main
            alert("You changed your password successfully");
          }
        })
        .then(json=>{
          console.log(json);
        })
        .catch(e => {
          const error = e.message;
          console.error(error);
          document.getElementById('securityAnswer').value = error;
          alert("The security answer is wrong!")
        });
    }else{
      alert("Your password didn't match the confirm password!");
    }
}



async function changeUsername(){
  
  const newUsername = document.getElementById('newUsernameValue').value;
  debugger;
  console.log(newUsername);
  const currentUsername = getCookieValue('username');
  
  if(newUsername === currentUsername){
    alert("Your new username can't be the old username!");
  }else{
    fetch(`http://localhost:8000/api/users/changeUsername`, {
      method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      currentUsername,
      newUsername
    }),
    }).then(response => {
      debugger;
      if (!response.ok) {
        throw new Error(response.statusText);
      }else{
        alert("You changed your username successfully");
        setCookie("username", newUsername, 30);
        document.cookie = "username = "+newUsername;

      }
    }).then(json=>{
      console.log(json);
    }).catch(e => {
      const error = e.message;
      console.error(error);
      document.getElementById('uname').value = error;
      alert("The username is already taken!")
    });
  }

}