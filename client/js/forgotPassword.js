const usernameField = document.getElementById('uname');
if(usernameField){
  console.log("Forgot Password");
  usernameField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      checkWhichSecurityQuestion();
    }
  });
}

async function checkWhichSecurityQuestion(event) {
    console.log("checkWhichSecurityQuestion")
    const username = document.getElementById('uname').value;
    await fetch(`http://localhost:8000/getSecurityQuestion?username=${username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }else{
            response.json().then(data => {
              document.getElementById("securityQuestion").innerHTML = "<b>"+data+"</b>";
              document.getElementById("securityQuestionInput").disabled = false;
              document.getElementById("psw").disabled = false;
              document.getElementById("psw2").disabled = false;
              document.getElementById("uname").disabled = true;
            })
            usernameField.removeEventListener('keypress', checkWhichSecurityQuestion, true);
            document.getElementById('forgotPassword').addEventListener("submit", checkForgotPassword);
          }
        }
    )
  }

async function checkForgotPassword(event) {
    event.preventDefault();
    const username = usernameField.value;
    const password = document.getElementById('psw').value;
    const confirmPassword = document.getElementById('psw2').value;
    const securityAnswer = document.getElementById('securityQuestionInput').value;

    if(password === confirmPassword && username != "Not Acceptable"){
      await fetch(`http://localhost:8000/resetPasswordCheck?username=${username}&password=${password}&securityAnswer=${securityAnswer}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }else{
            //redirect to login
            confirm("You changed you password.\nYou'll get redirected to the Login.");
            window.location.href= '../html/login.html';
          }
        })
        .catch(e => {
          console.error(e.message);
          alert("Your security Question is wrong!\nPlease try again.")
        });
    }else{
      alert("Your password didn't match the Confirmpassword!");
    }
  }