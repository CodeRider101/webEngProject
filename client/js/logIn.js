// Check if the entered username and password are correct
export const checkLogin = async (event) => {
    let username = document.getElementById("uname").value;
    let password = document.getElementById("psw").value;
    let rememberMe = document.getElementById("remember").value;

    await fetch(`http://localhost:8000/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            username,
            password,
            rememberMe,
        }),
    })
        .then((response) => {
            if (response.ok) {
                //set username cookie
                document.cookie = "username=" + username;
                //Redirect to main
                confirm(
                    "Welcome back! You'll be redirected to the main page in a sec."
                );
                window.location.href = "../html/index.html";
            } else {
                //Wrong user or wrong password
                return response.json().then((data) => {
                    throw new Error(data.error);
                });
            }
        })
        .catch((error) => {
            alert(error.message);
        });
};
