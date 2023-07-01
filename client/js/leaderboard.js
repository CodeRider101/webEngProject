let menu = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');

menu.addEventListener('click', () => {
  menu.classList.toggle('bx-x');
  navBar.classList.toggle('open');
});

let output = document.getElementById('output');
let slider = document.getElementById('slider');

function updateSlider(){
   let value = this.value;
   output.textContent = value;
}

slider.addEventListener('change', updateSlider, false);