// When the page is loaded, the theme is set according to the cookie
window.addEventListener("DOMContentLoaded", (event) => {
    setThemeFromCookie();
});

// Check if dark theme is selected
export function isDarkThemeSelected() {
    return document.cookie.match(/theme=dark/) != null;
}

// Set theme from cookie
export function setThemeFromCookie() {
    document.documentElement.setAttribute(
        "data-theme",
        isDarkThemeSelected() ? "dark" : "light"
    );
    document.querySelector('.theme-switch input[type="checkbox"]').checked =
        isDarkThemeSelected();
}
