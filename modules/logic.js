import {playerOne, playerTwo} from './players.js'


export let turn = true;
export const slots = document.querySelectorAll('.spot');
let logicSpaces = new Array(9);

let scoreTic = 0;
let scoreDraw = 0;
let scoreTac = 0;


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

export const hasWon = () => {
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        
        if(logicSpaces[a] && (logicSpaces[a] == logicSpaces[b] && logicSpaces[a] == logicSpaces[c])) {
            return [a,b,c];
        }
    }
    return false
}

export const finishedGame = () => {
    slots.forEach(buttons => {
        buttons.disabled = true;
    });
}

export const restart = () => {
    
    if (hasWon()) {
        let [a, b, c] = hasWon();
        slots[a].classList.remove('winnerSpot');
        slots[b].classList.remove('winnerSpot');
        slots[c].classList.remove('winnerSpot');
    }
    
    logicSpaces = new Array(9);
    
    slots.forEach(buttons => {
        buttons.disabled = false; 
    });
    
    turnTrue();

    for (const element of slots) {
        if(element.firstElementChild){
            element.firstElementChild.remove();
        }
    }
}

export const printWinner = () => {
    let [a, b, c] = hasWon();
    
    slots[a].classList.add('winnerSpot');
    slots[b].classList.add('winnerSpot');
    slots[c].classList.add('winnerSpot');
}

export const updateScore = () => {
    const [a, b, c] = hasWon();
    let winner;
    if (logicSpaces[a] == 'X') {
        scoreTic = scoreTic + 1;
        document.querySelector('#score-tic').innerHTML = scoreTic;
        return 'X';

    } else if( logicSpaces[a] == 'O'){
        scoreTac = scoreTac + 1;
        document.querySelector('#score-tac').innerHTML = scoreTac;
        return 'O';
    } else {
        document.querySelector('#score-draw').innerHTML = scoreDraw;
    }
}

export const toggleVisibleTurn = () => {
    let turnX = document.querySelector('#ticText');
    let turnY = document.querySelector('#tacText');
    turn == true ? (turnX.classList.add('active'), turnY.classList.remove('active'))
                 : (turnY.classList.add('active'), turnX.classList.remove('active') );
}

export const print = (e) => {
    let spaceClass = e.target.className;
    let space  = e.target.id;

    if ( spaceClass == 'spot' ) { 
        turn == true ? playerOne(space)
                     : playerTwo(space);
        logicSpot(space);
        hasWon() ? (modal.showModal(), printWinner(), finishedGame()) : (toggleTurn(), toggleVisibleTurn());
        
    }
    updateScore()
}