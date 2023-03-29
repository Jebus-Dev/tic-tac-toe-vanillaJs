import {playerOne, playerTwo} from './players.js'

export let turn = 'X';
export let logicSpaces = ['', '', '', '', '','', '', '', ''];
export let logicSpacesBot = ['one', 'two', 'three', 'four', 'five','six', 'seven', 'eight', 'nine'];

let winnerRound;
let scoreTic = 0;
let scoreDraw = 0;
let scoreTac = 0;
export const slots = document.querySelectorAll('.spot');
const btnCloseModal = document.querySelector('#close-modal');
const btnNextRound = document.querySelector('#next-round');
const modal = document.querySelector('#modal');
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

export const printLogicTurn = (id) => {
    const searchId = Array.from(slots).findIndex((spot) => spot.id === id)
    turn == 'X' ? logicSpaces[searchId] = 'X': logicSpaces[searchId] = 'O';
    return logicSpaces;
}

const updateScore = () => {

    let [a,b,c] = [];
    
    if (hasWon()){
     [a,b,c] = hasWon();
    }
    
    if (logicSpaces[a] == 'X') {
        scoreTic = scoreTic + 1;
        document.querySelector('#score-tic').innerHTML = scoreTic;
        winnerRound = 'X';

    } else if(logicSpaces[a] == 'O'){
        scoreTac = scoreTac + 1;
        document.querySelector('#score-tac').innerHTML = scoreTac;
        winnerRound = 'O';
    } else {
        scoreDraw = scoreDraw + 1;
        document.querySelector('#score-draw').innerHTML = scoreDraw;
        winnerRound = 'draw';
    }
}

const hasWon = () => {
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

const winnerModal = () => {

    modal.classList.add("modal-show");
    const firstElement = modal.lastElementChild;
    const winner = document.createElement("p");
  
    if (winnerRound !== "draw") {
      const classWinner = winnerRound === "X" ? "paragraph-winner-tic" : "paragraph-winner-tac";
  
      winner.innerHTML = `
        <p class="u-won"> YOU WON!! </p>
        <div>
          <p class="${classWinner}">${winnerRound}</p>
          <label class="takes-round">TAKES THE ROUND</label>
        </div>`;
    } else {
      winner.classList.add("paragraph-winner");
      winner.innerHTML = "DRAW";
    }
  
    modal.append(winner);
    modal.insertBefore(winner, firstElement);
    modal.showModal();

}

export const boardStatus = (slogicSpaces) => {
    return slogicSpaces != '';
}

const cleanModal = () => {
    if (hasWon() || logicSpaces.every(boardStatus)) {
        modal.firstElementChild.remove();
    }
}

btnCloseModal.addEventListener('click', () => {
    modal.close();
    modal.classList.remove('modal-show');
})

btnNextRound.addEventListener('click', () => {
    restart();
    modal.close();
})




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

        let spaceClass = pMove.target.className;
        let space  = pMove.target.id;

        if ( spaceClass == 'spot' ) { 
            
            turn == 'X' ? playerOne(space)
                        : playerTwo(space);
            
            printLogicTurn(space);
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
                turn = turn == 'X' ? turn = 'O'
                                   : turn = 'X';
            }
        }
}


export const spotbot = () => {

    let random = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    if ( logicSpaces[random] != '' ) {
        return spotbot();
    } else {
        juegoBot(logicSpacesBot[random]);
    }
}

const turno = () => {
    turn = turn == 'X' ? 'O' 
                       : 'X';
    turn == 'O' && spotbot(); 
}


export const juegoBot = (move) =>  {
    if (turn == 'X') {
        const space = move.target.id;
        const spaceClass = move.target.classList;
        if (spaceClass == 'spot') {
            playerOne(space);
            printLogicTurn(space);
            dissablePressedButton(space);
            if (!logicSpaces.every(boardStatus) && !hasWon()) {
                setTimeout(() => {
                    turno();
                }, '500');
            }
        }   
    } else {
        playerTwo(move);
        printLogicTurn(move);
        dissablePressedButton(move);
        turn = 'X';
    }


    if (hasWon()) {
        updateScore(),
        winnerPlacePrint(),
        winnerModal(),
        disableButtons();
    } else if (!hasWon() && logicSpaces.every(boardStatus)) {    
        updateScore();
        winnerModal();
        disableButtons();
    }
}