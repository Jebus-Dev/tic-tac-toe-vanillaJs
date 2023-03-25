import { restart, print, logicSpaces, boardStatus} from './modules/logic.js'

const board = document.querySelector('#chartContainer');
const btnRestartGame = document.querySelector('#restart');
const options = document.querySelectorAll('input[name="mode"]');
let mode;


export const game = () => {
    btnRestartGame.addEventListener('click', () => {
        restart();
        options.forEach( button => {
            button.disabled = false;
        });
        
    })
    
    board.addEventListener('click', (e) => {
        mode = document.querySelector('input[name="mode"]:checked').value;
        
        print(e, mode);

        if (logicSpaces.some(boardStatus)) {
            options.forEach( buttons => {
                buttons.disabled = true;
            });
        }
    })

    const toggleColor = document.querySelector('#color-toggle');

    toggleColor.addEventListener('click', () => {
        toggleColor.checked ? setUserTheme('dark') : setUserTheme('light');  
    })

    const setUserTheme = (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme);
    }

}