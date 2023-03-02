
export let turn = true;
export const slots = document.querySelectorAll('.spot');
let logicSpaces = new Array(9);
const turnX = document.querySelector('#ticText');
const turnY = document.querySelector('#tacText');

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
    toggleVisiblePlayerTurn()
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
    let [a, b, c] = hasWon();
    
    slots[a].classList.remove('winnerSpot');
    slots[b].classList.remove('winnerSpot');
    slots[c].classList.remove('winnerSpot');
    
    restartLogicSpaces();
    turnTrue();
    for (const element of slots) {
        slots .disabled = true;
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

export const winner = () => {
    const [a, b, c] = hasWon();
    let winner;
    if (logicSpaces[a] == 'X') {
        return 'X';
    } else {
        return 'O'
    }
}

export const restartLogicSpaces = () => {
    logicSpaces = new Array(9);
}

export const toggleVisiblePlayerTurn = () => {
        turn == true ? (turnX.classList.add('active'), turnY.classList.remove('active'))
                     : (turnY.classList.add('active'), turnX.classList.remove('active') );
}