import { toggleColor } from "../main.js";
export const changeTheme = (e) => {
    if (e.checked) {
        setUserTheme('dark')
        setThemeStorage('dark')
    } else {
        setUserTheme('light')
        setThemeStorage('light')
    }
}

const setUserTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
}

const setThemeStorage = (theme) => {
    localStorage.setItem('theme', JSON.stringify(theme));
}

export const getThemeStorage = () => {
    const themeMode = JSON.parse(localStorage.getItem('theme'));
    if (themeMode == 'dark') {
        toggleColor.checked = true;
    }
    if (themeMode) {
        setUserTheme(themeMode);
    } else {
        setUserTheme('light');
    }
}