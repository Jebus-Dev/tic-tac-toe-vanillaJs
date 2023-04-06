import { secondPlayerName } from './js/logic.js';
import { pvpGame, botGame, restartGame, logicSpaces, boardStatus } from './js/logic.js';
import { scoreLocalStorage, radioMode, scoreChange } from './js/storage.js';
import { changeTheme, getThemeStorage } from './js/theme.js';

const board = document.querySelector('#chart-container');
const btnRestartGame = document.querySelector('#btn-restart');
const options = document.querySelectorAll('input[name="mode"]');
export const toggleColor = document.querySelector('#color-toggle');
const radios = document.querySelectorAll('input[type="radio"][name="mode"]');

getThemeStorage();
scoreLocalStorage(radioMode);

radios.forEach(radio => {
    radio.addEventListener('change', function() {
        scoreChange(radio.value);
        secondPlayerName(radio.value);
    });
  });


btnRestartGame.addEventListener('click', () => {
    restartGame();
    options.forEach( button => {
        button.disabled = false;
    });
    
})


board.addEventListener('click', (e) => {
    if (e.target.classList == 'spot' ){
        let mode = document.querySelector('input[name="mode"]:checked').value
        mode == 'two-players' ? pvpGame(e) : botGame(e);    

        if (logicSpaces.some(boardStatus)) {
            options.forEach( buttons => {
                buttons.disabled = true;
            });        
        }
    }
})

toggleColor.addEventListener('click', (e) => {
    changeTheme(toggleColor);
})


