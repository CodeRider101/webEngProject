//slider
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
      score: "21533",
      date:"28th June 2023"
    },
    {
      score: "253633",
      date:"28th June 2023"
    },
    {
      score: "213",
      date:"253h June 2023"
    },
    {
      score: "2133",
      date:"32h June 2023"
    },
    {
      score: "33",
      date:"28th June 2023"
    }
  ];
  const container = document.getElementById("personalContainer");

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
    container.appendChild(row);


    i ++;
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