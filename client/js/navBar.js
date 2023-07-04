// Fetch and insert the navbar HTML
fetch('../html/navbar.html')
    .then(response => response.text())
    .then(html => {
      const navbarContainer = document.createElement('div');
      navbarContainer.innerHTML = html;
      document.body.insertBefore(navbarContainer, document.body.firstChild);
});


const homeTab = document.getElementById("Home");
homeTab.addEventListener("click", ()=>{
    homeTab.classList.add("active");
    leaderBoardTab.classList.remove("active)");
    settingsTab.classList.remove("active)");
    contactUsTab.classList.remove("active)");
})
const leaderBoardTab = document.getElementById("leaderboard");
leaderBoardTab.addEventListener("click", ()=>{
    homeTab.classList.remove("active");
    leaderBoardTab.classList.add("active)");
    settingsTab.classList.remove("active)");
    contactUsTab.classList.remove("active)");
})
const settingsTab = document.getElementById("settings");
settingsTab.addEventListener("click", ()=>{
    homeTab.classList.remove("active");
    leaderBoardTab.classList.remove("active)");
    settingsTab.classList.add("active)");
    contactUsTab.classList.remove("active)");
})
const contactUsTab = document.getElementById("contactUs");
contactUsTab.addEventListener("click", ()=>{
    console.log("Hallo Contact Us")
    homeTab.classList.remove("active");
    leaderBoardTab.classList.remove("active)");
    settingsTab.classList.add("active)");
    contactUsTab.classList.add("active)");
})