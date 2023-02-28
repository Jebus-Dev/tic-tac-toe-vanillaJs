import {playerOne, playerTwo} from './modules/players.js'
import {toggleVisiblePlayerTurn,  logicSpot, turn, toggleTurn, hasWon, restartLogicSpaces, turnTrue, winner} from './modules/logic.js'

const modal = document.querySelector('#modal')
const btnAbrirModal = document.querySelector('#btnAbrirModal')
const btnCerrarModal = document.querySelector('#btnCerrarModal')
const slots = document.querySelectorAll('.spot');

export const restartGame = () => {
    restartLogicSpaces()
    for (const element of slots) {
        if (element.firstElementChild) {
            console.log('hola')
            element.firstElementChild.remove();
        }
    }
    turnTrue();
}


export const print = (e) => {

    let spaceClass = e.target.className;
    let space  = e.target.id;

    if ( spaceClass == 'spot' ) { 
        turn == true ? (playerOne(space))
                     : playerTwo(space);
        logicSpot(space)

        hasWon() ? (modal.showModal, console.log(winner())) : (toggleTurn(), toggleVisiblePlayerTurn());

    }

}



btnCerrarModal.addEventListener('click', (e) => {
    modal.close();
})

