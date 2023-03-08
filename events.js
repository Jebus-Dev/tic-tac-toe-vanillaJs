import { restart, print} from './modules/logic.js'

const board = document.querySelector("#chartContainer");
const btnRestartGame = document.querySelector('#restart');


export const game = () => {

    btnRestartGame.addEventListener('click', () => {
        restart();
    })

    board.addEventListener('click', (e) => {
        print(e);
    })

    
}