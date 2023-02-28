import {restartGame, print } from './events.js'

const board = document.querySelector("#chartContainer");
const btnRestartGame = document.querySelector('#restartGame');




btnRestartGame.addEventListener('click', () => {
    restartGame();
})

board.addEventListener('click', (e) => {
    print(e);
})