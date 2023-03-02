import {playerOne, playerTwo} from './modules/players.js'
import {toggleVisiblePlayerTurn,  logicSpot, turn, toggleTurn, hasWon,  printWinner, restart, finishedGame} from './modules/logic.js'

const modal = document.querySelector('#modal')
const btnCerrarModal = document.querySelector('#btnCerrarModal')

export const restartGame = () => {
    restart();
}


export const print = (e) => {
    let spaceClass = e.target.className;
    let space  = e.target.id;

    if ( spaceClass == 'spot' ) { 
        turn == true ? playerOne(space)
                     : playerTwo(space);
        logicSpot(space)
        hasWon() ? (modal.showModal(), printWinner(), finishedGame()) : (toggleTurn(), toggleVisiblePlayerTurn());
        
    }
}

btnCerrarModal.addEventListener('click', (e) => {
    modal.close();
})

