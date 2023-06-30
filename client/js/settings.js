// Save the theme preference for 10 years.
var endDate = new Date();
endDate.setFullYear(endDate.getFullYear() + 10);

window.addEventListener('DOMContentLoaded', event => {
    toggleTheme();
    setThemeFromCookie();
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
    let wordLength = document.getElementById('wordLength').value;
    if (wordLength < 3 || wordLength > 9) {
      toastr.error("Please enter a number between 3 and 9");p
    } else {
        document.cookie = 'wLength=' + wordLength + '; Expires=' + endDate + ';'
        document.getElementById('wordLength').value = '';
        toastr.success("Word length changed to " + wordLength);
    }
  }
  
  let submit  = document.getElementById('changeLength');
  submit.addEventListener('click', wordLength, false);