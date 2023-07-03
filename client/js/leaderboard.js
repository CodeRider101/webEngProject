import { setThemeFromCookie } from './darkmode.js';

let menu = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');

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