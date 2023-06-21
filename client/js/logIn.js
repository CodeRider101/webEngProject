const signUp = document.getElementById("signUp");
if(signUp){
  console.log("Sign Up");
  signUp.addEventListener("submit", checkSignUp);
}

const login = document.getElementById("login");
if(login){
  console.log("Sign In");
  login.addEventListener("submit", checkLogin);
}

async function checkLogin(event) {
  event.preventDefault();
  let username = document.getElementById('uname').value;
  let password = document.getElementById('psw').value;
  let rememberMe = document.getElementById('remember').value;

  await fetch(`http://localhost:8000/logIn?username=${username}&password=${password}`)
    .then(response =>{
      if(!response.ok){
        throw new Error(response.statusText);
      }else{
        //confirm("Welcome back! You will get redirected to the game in a sec.")
        window.location.href= '../html/index.html';
        return response.json();
      }
    })
    .then(json =>{
      console.log(json);
    })
    .catch(error =>{
      console.error(error.message);
      alert(error.message);
    })
}

async function checkSignUp(event) {
  event.preventDefault();
  const username = document.getElementById('uname').value;
  const password = document.getElementById('psw').value;
  const confirmPassword = document.getElementById('psw2').value;

  if(password === confirmPassword && username != "Not Acceptable"){
    await fetch(`http://localhost:8000/createUser?username=${username}&password=${password}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }else{
          //redirect to login
          //confirm("You created an account. You will get redirected to the Game :)\nHave fun!");
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
        alert("This Username is already taken. Please chose another one!")
      });
  }else{
    alert("Your password didn't match the Confirmpassword!");
  }
}