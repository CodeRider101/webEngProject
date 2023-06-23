const usernameField = document.getElementById('checkUname');
if(usernameField){
    console.log("Forgot Password");
    const cookieName = getCookieValue('username');
    document.getElementById("checkUser").addEventListener("click", checkWhichSecurityQuestion)
    if(cookieName!=""&&cookieName){
        usernameField.value=cookieName;
        checkWhichSecurityQuestion();
    }else{
        usernameField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
            checkWhichSecurityQuestion();
            }
        });
    }
}

async function checkWhichSecurityQuestion(event){
    console.log("checkWhichSecurityQuestion")
    const username = document.getElementById('checkUname').value;
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
              document.getElementById("checkUname").disabled = true;
              document.getElementById("checkUser").disabled = true;
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
    if(securityAnswer=="" || securityAnswer==undefined){
        return;
    }

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


function getCookieValue(name) {
    let cookieName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
            }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}