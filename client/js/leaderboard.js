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
    console.log("ich wurde gedrückt: " + e.target.textContent);
    timeSpan = e.target.textContent;
    const leaderboardElements = document.querySelectorAll('.selectLeaderboard li');
    leaderboardElements.forEach(element => {
      if (element === e.target) {
        element.innerHTML = `<b>${element.textContent}</b>`;
      } else {
        element.innerHTML = element.textContent;
      }
    });
    loadOverallBest(wordLength, timeSpan);
  });
  loadOverallBest(wordLength, timeSpan)
  loadPersonalBest(wordLength);
}

function getCookieValue(a) {
  const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

async function findBest(user, wordLength, personal, timeSpan) {
  try {
    const response = await fetch(`http://localhost:8000/api/leaderboard/?username=${user}&wordLength=${wordLength}&personal=${personal}&timeSpan=${timeSpan}`);
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
   
  const personalContainer = document.getElementById("personalContainer");
  //delete all previous data
  personalContainer.innerHTML = ""; 
  if(getCookieValue('username') !== ""){
    const text = document.createElement("div");
    text.setAttribute("class", "text");
    text.innerHTML= "Please Log In for a Personal Best!";
    personalContainer.appendChild(text);
  }else{
    const data = await findBest(getCookieValue('username'),wordLength, "true","nothing here");
    console.log("hi"+ data); 
    let i = 1;
    for(const entry of data){
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
}

async function loadOverallBest(wordLength, timeSpan){
  const data = await findBest("xxx",wordLength, "false", timeSpan);

  

  const overallContainer = document.getElementById("overallContainer");
   //delete all previous data
   overallContainer.innerHTML = ""; 
  console.log("wordLength: "+ wordLength);
  console.log("timeSpan: "+ timeSpan);

  let i = 1;
  for(const entry of data){
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

  if(navBar.classList.contains('open')) {
    document.getElementById('leaderboardDiv').style.zIndex = '-1';
 } else {
     document.getElementById('leaderboardDiv').style.zIndex = '0';
 }
});




// Word length slider
function updateSlider() {
  wordLength = document.getElementById('sliderScore').value;
  output.textContent = wordLength;
  loadPersonalBest(wordLength);
  loadOverallBest(wordLength, timeSpan);
}