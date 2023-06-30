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

        // Save the theme preference for 10 years.
        var endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 10);
    
        document.cookie = 'theme=' + (darkModeEnabled ? 'dark' : 'light') + '; Expires=' + endDate + ';'
    }
    toggleSwitch.addEventListener('change', switchTheme, false);
}

function isDarkThemeSelected() {
    return document.cookie.match(/theme=dark/i) != null
}

function setThemeFromCookie() {
    document.documentElement.setAttribute('data-theme', isDarkThemeSelected() ? 'dark' : 'light');
    document.querySelector('.theme-switch input[type="checkbox"]').checked = isDarkThemeSelected();
}
