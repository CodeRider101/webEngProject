import { setThemeFromCookie } from './darkmode.js';

let menu = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');


window.onload = function() {
  console.log("Leaderboard"); 
  document.querySelector('#selectLeaderboard').addEventListener('click', (e) => {
    console.log(e.target.textContent);
  })
  loadPersonalBest();
}

function switchLeaderboard(timeSpan){

}

function loadPersonalBest(){
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
    place.innerHTML=i.toString();
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

  const overallContainer = document.getElementById("overallContainer");

  let o = 1;
  for(const entry of mockData){
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    const place = document.createElement("div");
    place.setAttribute("class", "place"); 
    place.innerHTML=o.toString();

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


    o ++;
  }

}


menu.addEventListener('click', () => {
  menu.classList.toggle('bx-x');
  navBar.classList.toggle('open');
});

let output = document.getElementById('outputScore');
let slider = document.getElementById('sliderScore');

function updateSlider(){
   let value = this.value;
   output.textContent = value;
}

slider.addEventListener('change', updateSlider, false);

//

const leaderboard = document.getElementById("leaderboard");
if(leaderboard){
  console.log("Sign Up");
}