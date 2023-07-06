// Fetch and insert the navbar HTML
fetch('../html/navbar.html')
    .then(response => response.text())
    .then(html => {
      const navbarContainer = document.createElement('div');
      navbarContainer.innerHTML = html;
      document.body.insertBefore(navbarContainer, document.body.firstChild);
});

function openPopup() {
    var popup = document.getElementById('popup');
    var overlay = document.getElementById('overlay');

    popup.style.visibility = 'visible';
    popup.style.opacity = '1';
    document.getElementById('wordle').style.zIndex = '-1';

    overlay.classList.add('active');
  }

  function closePopup() {
    var popup = document.getElementById('popup');
    var overlay = document.getElementById('overlay');

    popup.style.visibility = 'hidden';
    popup.style.opacity = '0';
    document.getElementById('wordle').style.zIndex = '0';


    overlay.classList.remove('active');
  }

window.onload = function() {
    let homeTab = document.getElementById("Home");
    let leaderBoardTab = document.getElementById("leaderboard");
    let settingsTab = document.getElementById("settings");
    let contactUsTab = document.getElementById("contactUs");
    if(homeTab){
        homeTab.addEventListener("click", ()=>{
            homeTab.classList.add("active");
            leaderBoardTab.classList.remove("active)");
            settingsTab.classList.remove("active)");
            contactUsTab.classList.remove("active)");
        })
    }
    if(leaderBoardTab){
        leaderBoardTab.addEventListener("click", ()=>{
            homeTab.classList.remove("active");
            leaderBoardTab.classList.add("active)");
            settingsTab.classList.remove("active)");
            contactUsTab.classList.remove("active)");
        })
    }
    if(settingsTab){
        settingsTab.addEventListener("click", ()=>{
            homeTab.classList.remove("active");
            leaderBoardTab.classList.remove("active)");
            settingsTab.classList.add("active)");
            contactUsTab.classList.remove("active)");
        })
    }
    if(contactUsTab){
        contactUsTab.addEventListener("click", ()=>{
            console.log("Hallo Contact Us")
            contactUsTab.classList.toggle("active)");
            homeTab.classList.remove("active");
            leaderBoardTab.classList.remove("active)");
            settingsTab.classList.remove("active)");
        })
    }
}