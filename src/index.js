import './sass/main.scss';
import menuItems from './js/menu.json';
import menuTemplate from './handlebars/menu.hbs';

const menuEl = document.querySelector('.js-menu');
const themeSwitchCheckBoxEl = document.querySelector('#theme-switch-toggle');

const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };

const LOCALSTORAGE_ITEMS = {
    theme: 'theme',
    isThemeSwitchChecked: 'isThemeSwitchChecked',
}; 

onFirstLoadBodyLightThemeClassAdding();
useThemeFromLocalStorage();

themeSwitchCheckBoxEl.addEventListener('change', onThemeSwitchChange);  

menuEl.insertAdjacentHTML('beforeend', createMenuMarkup(menuItems));

function createMenuMarkup(menu) {
    return menuTemplate(menu);
}

function onThemeSwitchChange(evt) {
    bodyClassToggling(evt);
    localStorageThemeSetting(evt);

    console.log(localStorage.getItem(LOCALSTORAGE_ITEMS.theme));
    console.log(localStorage.getItem(LOCALSTORAGE_ITEMS.isThemeSwitchChecked));
}

function useThemeFromLocalStorage() {
    const currentTheme = localStorage.getItem(LOCALSTORAGE_ITEMS.theme);
    const isThemeSwitchChecked = localStorage.getItem(LOCALSTORAGE_ITEMS.isThemeSwitchChecked);

    if(currentTheme) {
        document.body.classList.add(currentTheme);
    }

    if(isThemeSwitchChecked) {
        themeSwitchCheckBoxEl.checked = isThemeSwitchChecked === 'true' ? true : false;
    }
}

function onFirstLoadBodyLightThemeClassAdding() {
    if(document.body.classList.length) {
        document.body.classList.add(Theme.LIGHT);
    }
}

function bodyClassToggling(evt) {
    if(evt.target.checked) {
        document.body.classList.remove(Theme.LIGHT);
        document.body.classList.add(Theme.DARK);
    } else {
        document.body.classList.remove(Theme.DARK);
        document.body.classList.add(Theme.LIGHT);
    }
}

function localStorageThemeSetting(evt) {
    if(evt.target.checked) { 
        localStorage.setItem(LOCALSTORAGE_ITEMS.theme, Theme.DARK);
        localStorage.setItem(LOCALSTORAGE_ITEMS.isThemeSwitchChecked, true);
    } else {
        localStorage.setItem(LOCALSTORAGE_ITEMS.theme, Theme.LIGHT);
        localStorage.setItem(LOCALSTORAGE_ITEMS.isThemeSwitchChecked, false);
    }
}
