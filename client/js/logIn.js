const login = document.getElementById("wholeBox");
if(login){
  console.log("logIn");
  login.addEventListener("submit", ()=>{
    console.log("Dummer Hund");
  }
  );
}

async function checkLogin(event) {
  console.log("login");
  event.preventDefault();
  let username = document.getElementById('uname').value;
  let password = document.getElementById('psw').value;
  let rememberMe = document.getElementById('remember').value;

  document.cookie = "username=" + username;

  await fetch(`http://localhost:8000/api/login/logIn`, {
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