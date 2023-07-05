import { setThemeFromCookie } from './darkmode.js';

let menu = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');
let wordLength = 5;
let timeSpan = "All time";

window.onload = function() {
  console.log("Leaderboard"); 
  document.getElementById('sliderScore').setAttribute("value",wordLength);
  document.getElementById('outputScore').textContent = wordLength;
  document.querySelector('#selectLeaderboard').addEventListener('click', (e) => {
    timeSpan = e.target.textContent;
    loadOverallBest(wordLength, timeSpan);
  })
  loadOverallBest(wordLength, timeSpan)
  loadPersonalBest(wordLength);
}

function switchLeaderboard(timeSpan){

}

function loadPersonalBest(wordlength){
  const mockData = [
    {
      name: "jeje",
      score: "21533",
      date:"28th June 2023"
    },
    {
      name: "jeje",
      score: "253633",
      date:"28th June 2023"
    },
    {
      name: "jeje",
      score: "213",
      date:"253h June 2023"
    },
    {
      name: "jeje",
      score: "2133",
      date:"32h June 2023"
    },
    {
      name: "jeje",
      score: "33",
      date:"28th June 2023"
    }
  ];
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

function loadOverallBest(wordLength, timeSpan){
  const mockData = [
    {
      name: "jeje",
      score: "21533",
      date:"28th June 2023"
    },
    {
      name: "jeje",
      score: "253633",
      date:"28th June 2023"
    },
    {
      name: "jeje",
      score: "213",
      date:"253h June 2023"
    },
    {
      name: "jeje",
      score: "2133",
      date:"32h June 2023"
    },
    {
      name: "jeje",
      score: "33",
      date:"28th June 2023"
    }
  ];
  

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

    const name = document.createElement("div");
    name.setAttribute("class", "name");
    name.innerHTML=entry.name;

    const score = document.createElement("div");
    score.setAttribute("class", "score");
    score.innerHTML=entry.score;

    const date = document.createElement("div");
    date.setAttribute("class", "date");
    date.innerHTML=entry.date;
    row.appendChild(place);
    row.appendChild(name);
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


let output = document.getElementById('outputScore');
let slider = document.getElementById('sliderScore');

slider.addEventListener('change', updateSlider, false);

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