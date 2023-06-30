let menu = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');

menu.addEventListener('click', () => {
  menu.classList.toggle('bx-x');
  navBar.classList.toggle('open');
});