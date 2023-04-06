import { restart, print, logicSpaces, boardStatus, juegoBot} from './js/logic.js'
import { scoreLocalStorage, setScores } from './js/storage.js'

const board = document.querySelector('#chart-container');
const btnRestartGame = document.querySelector('#btn-restart');
const options = document.querySelectorAll('input[name="mode"]');
const toggleColor = document.querySelector('#color-toggle');
const radios = document.querySelectorAll('input[type="radio"][name="mode"]');
export let radioMode = 'scorepvp';

scoreLocalStorage(radioMode);

radios.forEach(radio => {
    radio.addEventListener('change', function() {
        let name = radio.value;
        name == 'two-players' ? scoreLocalStorage('scorepvp') : scoreLocalStorage('scorebot');
        radioMode = name == 'two-players' ? 'scorepvp' : 'scorebot';
    });
  });


btnRestartGame.addEventListener('click', () => {
    restart();
    options.forEach( button => {
        button.disabled = false;
    });
    
})


board.addEventListener('click', (e) => {
    if (e.target.classList == 'spot' ){
        let mode = document.querySelector('input[name="mode"]:checked').value
        mode == 'two-players' ? print(e) : juegoBot(e);    

        if (logicSpaces.some(boardStatus)) {
            options.forEach( buttons => {
                buttons.disabled = true;
            });        
        }
    }
})

toggleColor.addEventListener('click', () => {
    toggleColor.checked ? setUserTheme('dark') : setUserTheme('light');  
})

const setUserTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
}
