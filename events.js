import { restart, print} from './modules/logic.js'

const board = document.querySelector("#chartContainer");
const btnRestartGame = document.querySelector('#restart');
const btnNextRound = document.querySelector('#next-round');
const modal = document.querySelector('#modal');
const btnCerrarModal = document.querySelector('#btnCerrarModal');

export const game = () => {

    btnRestartGame.addEventListener('click', () => {
        restart();
    })

    board.addEventListener('click', (e) => {
        print(e);
    })

    btnCerrarModal.addEventListener('click', () => {
        modal.close(); 
    })

    btnNextRound.addEventListener('click', () => {
        restart();
        modal.close();
    })

}