import {playerOne, playerTwo} from './players.js'


export let turn = true;
export const slots = document.querySelectorAll('.spot');
let logicSpaces = ['', '', '', '', '','', '', '', ''];
let draw;
let scoreTic = 0;
let scoreDraw = 0;
let scoreTac = 0;
const modal = document.querySelector('#modal');
const btnCerrarModal = document.querySelector('#btnCerrarModal');
const btnNextRound = document.querySelector('#next-round');
const openModal = document.querySelector('#openModal');

openModal.addEventListener('click', () => {
    modal.showModal();

    modal.classList.add('modal-show');

})


const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

export const  turnTrue = () => {
    toggleVisibleTurn()
    turn = true;
}

export const toggleTurn = () => {
    turn = !turn;
    return turn;
}

export const logicSpot = (id) => {
    const idSpot = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    let indexId = idSpot.indexOf(id);
    turn ? logicSpaces[indexId] = 'X': logicSpaces[indexId] = 'O';
    return logicSpaces;
}
// winners

const hasWon = () => {
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        
        if(logicSpaces[a] && (logicSpaces[a] == logicSpaces[b] && logicSpaces[a] == logicSpaces[c])) {
            return [a,b,c];
        }
    }
    return false
}

const finishedGame = () => {
    slots.forEach(buttons => {
        buttons.disabled = true;
    });
}



const printWinner = () => {
    let [a, b, c] = hasWon();
    
    slots[a].classList.add('winnerSpot');
    slots[b].classList.add('winnerSpot');
    slots[c].classList.add('winnerSpot');
}

const updateScore = () => {
    let [a,b,c] = [];
    if (hasWon()){
     [a,b,c] = hasWon();
    }
    

    if (logicSpaces[a] == 'X') {
        scoreTic = scoreTic + 1;
        document.querySelector('#score-tic').innerHTML = scoreTic;
        return 'X';

    } else if(logicSpaces[a] == 'O'){
        scoreTac = scoreTac + 1;
        document.querySelector('#score-tac').innerHTML = scoreTac;
        return 'O';
    } else {
        scoreDraw = scoreDraw + 1;
        document.querySelector('#score-draw').innerHTML = scoreDraw;
        return 'draw';
    }
}

const toggleVisibleTurn = () => {
    let turnX = document.querySelector('#ticText');
    let turnY = document.querySelector('#tacText');
    turn == true ? (turnX.classList.add('active'), turnY.classList.remove('active'))
                 : (turnY.classList.add('active'), turnX.classList.remove('active') );
}

const showModal = ( status ) => {
    if (status !== 'draw') {

        modal.classList.add('modal-show');
        const firstElement = modal.lastElementChild;

        const winner = document.createElement('p');

        winner.innerHTML = `<p class="u-won"> YOU WON!! </p> 
        <p class="paragraph-winner">${ status } <label class="takes-round">TAKES THE ROUND</label></p>`;
        
        modal.append( winner );
        modal.insertBefore(winner, firstElement);

        
        modal.showModal();
        
    } else {

        modal.classList.add('modal-show');
        const firstElement = modal.lastElementChild;

        const winner = document.createElement('p');
        winner.classList.add('paragraph-winner');

        winner.innerHTML = `DRAW`;
        document.querySelector('#modal').appendChild( winner );
        modal.insertBefore(winner, firstElement);

        modal.showModal();

    }
}

const draws = (slogicSpaces) => {
    return slogicSpaces !== '';
}

const disableButtonPressed = (slot) => {

    for (const element of slots) {
        if (element.id == slot) {
            element.disabled = true;
        }
    }    
}




btnCerrarModal.addEventListener('click', () => {
    modal.close();
    modal.classList.remove('modal-show');
})

btnNextRound.addEventListener('click', () => {
    restart();
    modal.close();
})

export const restart = () => {
    
    if (hasWon()) {
        let [a, b, c] = hasWon();
        slots[a].classList.remove('winnerSpot');
        slots[b].classList.remove('winnerSpot');
        slots[c].classList.remove('winnerSpot');    
        modal.firstElementChild.remove();
    }
    logicSpaces = ['', '', '', '', '','', '', '',];

    slots.forEach(buttons => {
        buttons.disabled = false; 
    });
    
    turnTrue();

    for (const element of slots) {
        if(element.firstElementChild){
            element.firstElementChild.remove();
        }
    }

    modal.classList.remove('modal-show');

}


export const print = (e) => {
    let spaceClass = e.target.className;
    let space  = e.target.id;
    if ( spaceClass == 'spot' ) { 
        
        turn == true ? playerOne(space)
                     : playerTwo(space);
        
        logicSpot(space);
        disableButtonPressed(space);
        
        if (hasWon()) {
            showModal(updateScore()),
            printWinner(),
            finishedGame();
        } else if (!hasWon() && logicSpaces.every(draws) ) {
            showModal(updateScore());
        } else {
            toggleTurn(), toggleVisibleTurn();
        }
    }
}