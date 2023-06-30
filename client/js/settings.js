// Save the theme preference for 10 years.
var endDate = new Date();
endDate.setFullYear(endDate.getFullYear() + 10);

window.addEventListener('DOMContentLoaded', event => {
    toggleTheme();
    setThemeFromCookie();
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("wLength="))
      ?.split("=")[1];
    output.textContent = cookieValue;
    slider.value = cookieValue;
});

const toggleTheme = () => {
    // Theme toggle
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    function switchTheme(e) {
        let darkModeEnabled = e.target.checked;
        document.documentElement.setAttribute('data-theme', darkModeEnabled ? 'dark' : 'light');
    
        document.cookie = 'theme=' + (darkModeEnabled ? 'dark' : 'light') + '; Expires=' + endDate + ';'
    }
    toggleSwitch.addEventListener('change', switchTheme, false);
}

function isDarkThemeSelected() {
    return document.cookie.match(/theme=dark/) != null
}

function setThemeFromCookie() {
    document.documentElement.setAttribute('data-theme', isDarkThemeSelected() ? 'dark' : 'light');
    document.querySelector('.theme-switch input[type="checkbox"]').checked = isDarkThemeSelected();
}


function wordLength() {
    let wordLength = document.getElementById('slider').value;
    document.cookie = 'wLength=' + wordLength + '; Expires=' + endDate + ';'
    toastr.success("Word length changed to " + wordLength);
    output.textContent = wordLength;
  }
  
//   let submit  = document.getElementById('changeLength');
//   submit.addEventListener('click', wordLength, false);


let output = document.getElementById('output');
let slider = document.getElementById('slider');

function updateSlider(){
   let value = this.value;
   output.textContent = value;
}

slider.addEventListener('change', wordLength, false);
