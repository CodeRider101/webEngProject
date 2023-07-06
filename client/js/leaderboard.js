import { setThemeFromCookie } from './darkmode.js';

let menu = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');
let wordLength = 5;
let timeSpan = "All time";
let output = document.getElementById('outputScore');
let slider = document.getElementById('sliderScore');


window.onload = function() {
  console.log("Leaderboard"); 
  slider.addEventListener('change', updateSlider, false);
  document.getElementById('sliderScore').setAttribute("value",wordLength);
  document.getElementById('outputScore').textContent = wordLength;
  document.querySelector('.selectLeaderboard').addEventListener('click', (e) => {
    console.log("ich wurde gedrückt: "+ e.target.textContent)
    timeSpan = e.target.textContent;
    loadOverallBest(wordLength, timeSpan);
  })
  loadOverallBest(wordLength, timeSpan)
  loadPersonalBest(wordLength);
}

async function findBest(user, wordLength, personal) {
  try {
    const response = await fetch(`http://localhost:8000/api/leaderboard/?username=${user}&wordLength=${wordLength}&personal=${personal}`);
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      console.log('Error: Unable to fetch high score'+ personal);
      return null;
    }
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
}

async function loadPersonalBest(wordLength){
   const mockData = await findBest("xxx",wordLength, "true");
  console.log("hi"+ mockData);
  const personalContainer = document.getElementById("personalContainer");

  let i = 1;
  for(const entry of mockData){
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    const place = document.createElement("div");
    place.setAttribute("class", "place"); 
    let p = "1";
    switch(i){
      case 1:
        p= "1st";
        break;
      case 2:
        p= "2nd";
        break;

      case 3:
        p= "3rd";  
        break;

      case 4:
        p= "4th";
        break;

      case 5:
        p= "5th";    
        break;
    }
    place.innerHTML=p;
    const score = document.createElement("div");
    score.setAttribute("class", "score");
    score.innerHTML=entry.score;

    const date = document.createElement("div");
    date.setAttribute("class", "date");
    date.innerHTML=entry.date;
    row.appendChild(place);
    row.appendChild(score);
    row.appendChild(date);
    personalContainer.appendChild(row);
    i ++;
  }
}

async function loadOverallBest(wordLength, timeSpan){
  const mockData = await findBest("xxx",wordLength, "false");

  

  const overallContainer = document.getElementById("overallContainer");
  console.log("wordLength: "+ wordLength);
  console.log("timeSpan: "+ timeSpan);

  let i = 1;
  for(const entry of mockData){
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    const place = document.createElement("div");
    place.setAttribute("class", "place"); 
    let p = 1;
    switch(i){
      case 1:
        p= "1st";
        break;
      case 2:
        p= "2nd";
        break;

      case 3:
        p= "3rd";       
        break;

      case 4:
        p= "4th";       
        break;

      case 5:
        p= "5th";       
        break;
    }
    place.innerHTML=p;

    const username = document.createElement("div");
    username.setAttribute("class", "username");
    username.innerHTML=entry.username;

    const score = document.createElement("div");
    score.setAttribute("class", "score");
    score.innerHTML=entry.score;

    const date = document.createElement("div");
    date.setAttribute("class", "date");
    date.innerHTML=entry.date;
    row.appendChild(place);
    row.appendChild(username);
    row.appendChild(score);
    row.appendChild(date);
    overallContainer.appendChild(row);


    i ++;
  }

}


menu.addEventListener('click', () => {
  menu.classList.toggle('bx-x');
  navBar.classList.toggle('open');
});




// Word length slider
function updateSlider() {
  wordLength = document.getElementById('sliderScore').value;
  output.textContent = wordLength;
  loadPersonalBest(wordLength);
  loadOverallBest(wordLength, timeSpan);
}

const leaderboard = document.getElementById("leaderboard");
if(leaderboard){
  console.log("Sign Up");
}