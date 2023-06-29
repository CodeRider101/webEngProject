const signUp = document.getElementById("signUp");
if(signUp){
  console.log("Sign Up");
  signUp.addEventListener("submit", checkSignUp);
}

const login = document.getElementById("wholeBox");
if(login){
  console.log("Sign In");
  login.addEventListener("submit", checkLogin);
}

async function checkLogin(event) {
  event.preventDefault();
  console.log("login");
  let username = document.getElementById('uname').value;
  let password = document.getElementById('psw').value;
  let rememberMe = document.getElementById('remember').value;

  document.cookie = "username=" + username;

  await fetch(`http://localhost:8000/api/users/logIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      username,
      password,
      rememberMe
    }),
  })
  .then(response => {
    if (response.ok) {
      // Successful login
      console.log('Login successful');
      //redirect to main
      confirm("Welcome back. You'll get redirected to the main page in a sec.");
      window.location.href= '../html/index.html';
    } else {
      //wrong user or wrong password
      return response.json().then(data => {
        throw new Error(data.error);
      });
    }
  })
  .catch(error => {
    alert(error.message);
    console.log(error.message);
  });
}

async function checkSignUp(event) {
  event.preventDefault();
  const username = document.getElementById('uname').value;
  const password = document.getElementById('psw').value;
  const confirmPassword = document.getElementById('psw2').value;
  const securityAnswer = document.getElementById('securityAnswer').value;
  const securityQuestion = document.getElementById('securityQuestion').value;


  if(password === confirmPassword && username != "Not Acceptable"){
    await fetch(`http://localhost:8000/createUser?username=${username}&password=${password}&securityQuestion=${securityQuestion}&securityAnswer=${securityAnswer}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }else{
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