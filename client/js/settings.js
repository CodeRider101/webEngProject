// Import function to set theme from cookie
import { setThemeFromCookie } from "./darkmode.js";

// Save the theme preference for 10 years.
let endDate = new Date();
endDate.setFullYear(endDate.getFullYear() + 10);

// Set theme from cookie and set slider value either to a default or the cookie value, after DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
    toggleTheme();
    setThemeFromCookie();
    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("wLength="))
        ?.split("=")[1];
    if (cookieValue == undefined) {
        document.cookie = "wLength=5; Expires=" + endDate + ";";
    }
    output.textContent = cookieValue;
    slider.value = cookieValue;
});

// Theme toggle to switch between light and dark mode
const toggleTheme = () => {
    const toggleSwitch = document.querySelector(
        '.theme-switch input[type="checkbox"]'
    );
    function switchTheme(e) {
        let darkModeEnabled = e.target.checked;
        document.documentElement.setAttribute(
            "data-theme",
            darkModeEnabled ? "dark" : "light"
        );

        document.cookie =
            "theme=" +
            (darkModeEnabled ? "dark" : "light") +
            "; Expires=" +
            endDate +
            ";";
    }
    toggleSwitch.addEventListener("change", switchTheme, false);
};

// Word length slider to change the length of the words in the game
function wordLength() {
    let wordLength = document.getElementById("slider").value;
    document.cookie = "wLength=" + wordLength + "; Expires=" + endDate + ";";
    toastr.success("Word length changed to " + wordLength);
    output.textContent = wordLength;
}

let output = document.getElementById("output");
let slider = document.getElementById("slider");

slider.addEventListener("change", wordLength, false);