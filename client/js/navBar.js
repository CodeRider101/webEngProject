// Fetch and insert the navbar HTML
fetch('../html/navbar.html')
    .then(response => response.text())
    .then(html => {
      const navbarContainer = document.createElement('div');
      navbarContainer.innerHTML = html;
      document.body.insertBefore(navbarContainer, document.body.firstChild);
});

let homeTab = document.getElementById("Home");
if(homeTab){
    homeTab.addEventListener("click", ()=>{
        homeTab.classList.add("active");
        leaderBoardTab.classList.remove("active)");
        settingsTab.classList.remove("active)");
        contactUsTab.classList.remove("active)");
    })
}
let leaderBoardTab = document.getElementById("leaderboard");
if(leaderBoardTab){
    leaderBoardTab.addEventListener("click", ()=>{
        homeTab.classList.remove("active");
        leaderBoardTab.classList.add("active)");
        settingsTab.classList.remove("active)");
        contactUsTab.classList.remove("active)");
    })
}
let settingsTab = document.getElementById("settings");
if(settingsTab){
    settingsTab.addEventListener("click", ()=>{
        homeTab.classList.remove("active");
        leaderBoardTab.classList.remove("active)");
        settingsTab.classList.add("active)");
        contactUsTab.classList.remove("active)");
    })
}
let contactUsTab = document.getElementById("contactUs");
if(contactUsTab){
    contactUsTab.addEventListener("click", ()=>{
        console.log("Hallo Contact Us")
        homeTab.classList.remove("active");
        leaderBoardTab.classList.remove("active)");
        settingsTab.classList.add("active)");
        contactUsTab.classList.add("active)");
    })
}