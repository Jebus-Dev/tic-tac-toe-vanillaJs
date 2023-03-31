import { restart, print, logicSpaces, boardStatus, juegoBot, mostrartScoresLocalStorage} from './modules/logic.js'

const board = document.querySelector('#chart-container');
const btnRestartGame = document.querySelector('#btn-restart');
const options = document.querySelectorAll('input[name="mode"]');
const toggleColor = document.querySelector('#color-toggle');
let mode;

mostrartScoresLocalStorage();

btnRestartGame.addEventListener('click', () => {
    restart();
    options.forEach( button => {
        button.disabled = false;
    });
    
})


board.addEventListener('click', (e) => {
    mode = document.querySelector('input[name="mode"]:checked').value;

    mode == 'two-players' ? print(e) : juegoBot(e);    

    
    if (logicSpaces.some(boardStatus)) {
        options.forEach( buttons => {
            buttons.disabled = true;
        });
    }
})





toggleColor.addEventListener('click', () => {
    toggleColor.checked ? setUserTheme('dark') : setUserTheme('light');  
})

const setUserTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
}
