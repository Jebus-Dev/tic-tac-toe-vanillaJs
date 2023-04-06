import { playerOne, playerTwo } from './turn.js';
import { setScores, scorepvp, scorebot, radioMode } from './storage.js';
import { winnerModal, cleanModal } from './modal.js';


export let turn = 'X';
export let logicSpaces = ['', '', '', '', '','', '', '', ''];
export let logicSpacesBot = ['one', 'two', 'three', 'four', 'five','six', 'seven', 'eight', 'nine'];
export const slots = document.querySelectorAll('.spot');
export let winnerRound;
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

export const setLogicTurn = (id) => {
    const searchId = Array.from(slots).findIndex((spot) => spot.id === id)
    turn == 'X' ? logicSpaces[searchId] = 'X': logicSpaces[searchId] = 'O';
    return logicSpaces;
}

const updateScore = () => {
    let scores = radioMode == 'scorepvp' ? scorepvp: scorebot;

    let [a,b,c] = [];    
    if (hasWon()){
     [a,b,c] = hasWon();
    }
    if (logicSpaces[a] == 'X') {
        scores.tic++;
        document.querySelector('#score-tic').innerHTML = scores.tic;
        winnerRound = 'X';

    } else if(logicSpaces[a] == 'O'){
        scores.tac++;
        document.querySelector('#score-tac').innerHTML = scores.tac;
        winnerRound = 'O';
    } else {
        scores.draw++;
        document.querySelector('#score-draw').innerHTML = scores.draw;
        winnerRound = 'draw';
    }
    setScores(radioMode);
}

export const hasWon = () => {
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        
        if(logicSpaces[a] && (logicSpaces[a] == logicSpaces[b] && logicSpaces[a] == logicSpaces[c])) {
            return [a,b,c];
        }
    }
    return false
}

const disableButtons = () => {
    slots.forEach(buttons => {
        buttons.disabled = true;
    });
}

const dissablePressedButton = (slot) => {

    for (const element of slots) {
        if (element.id == slot) {
            element.disabled = true;
        }
    }    
}

const winnerPlacePrint = () => {
    let [a, b, c] = hasWon();
    const winnerClass = winnerRound == 'X' ? 'winner-tic' : 'winner-tac';
    slots[a].classList.add(winnerClass);
    slots[b].classList.add(winnerClass);
    slots[c].classList.add(winnerClass);
}

export const boardStatus = (slogicSpaces) => {
    return slogicSpaces != '';
}



export const spotbot = () => {

    let random = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    if ( logicSpaces[random] != '' ) {
        return spotbot();
    } else {
        setTimeout(() => {
            juegoBot(logicSpacesBot[random]);
        }, 500);
    }
}

const playerTurn = () => {
    return turn = turn == 'X' ? 'O' 
                        : 'X';
}

export const restart = () => {
    
    cleanModal();
    if (hasWon()) {
        let [a, b, c] = hasWon();
        const winner = winnerRound == 'X' ? 'winner-tic' : 'winner-tac';
        slots[a].classList.remove(winner);
        slots[b].classList.remove(winner);
        slots[c].classList.remove(winner);
    }
    logicSpaces = ['', '', '', '', '','', '', '',];
    
    slots.forEach(buttons => {
        buttons.disabled = false; 
    });
    
    turn = 'X';
    
    for (const spot of slots) {
        if(spot.firstElementChild){
            spot.firstElementChild.remove();
        }
    }
    modal.classList.remove('modal-show');
}



export const print = (pMove) => {

        let space  = pMove.target.id;

        turn == 'X' ? playerOne(space)
                    : playerTwo(space);
            
            setLogicTurn(space);
            dissablePressedButton(space);
            if (hasWon()) {
                updateScore(),
                winnerPlacePrint(),
                winnerModal(),
                disableButtons();
            } else if (!hasWon() && logicSpaces.every(boardStatus)) {    
                updateScore();
                winnerModal();
            } else {
                playerTurn();
            }
}

export const juegoBot = (move) =>  {
    if ( turn == 'X' ) {
        const space = move.target.id;
        playerOne(space);
        setLogicTurn(space);
        dissablePressedButton(space);    
    } else if ( turn == 'O' ) {
        playerTwo(move);
        setLogicTurn(move);
        dissablePressedButton(move);
    }

    if (hasWon()) {
        updateScore();
        winnerModal();
        winnerPlacePrint();
        disableButtons();
    } else if (!hasWon() && logicSpaces.every(boardStatus)) {    
        updateScore();
        winnerModal();
        disableButtons();
    } else {
        playerTurn() == 'O' && spotbot(); 
    }
}

