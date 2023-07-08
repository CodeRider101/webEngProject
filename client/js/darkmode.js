window.addEventListener("DOMContentLoaded", (event) => {
    setThemeFromCookie();
});

export function isDarkThemeSelected() {
    return document.cookie.match(/theme=dark/) != null;
}

export function setThemeFromCookie() {
    document.documentElement.setAttribute(
        "data-theme",
        isDarkThemeSelected() ? "dark" : "light"
    );
    document.querySelector('.theme-switch input[type="checkbox"]').checked =
        isDarkThemeSelected();
}
