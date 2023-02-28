const turnX = document.querySelector('#ticText');
const turnY = document.querySelector('#tacText');
let logicSpaces = new Array(9);
export let turn = true;




export const  turnTrue = () => {
    toggleVisiblePlayerTurn()
    turn = true;
}

export const toggleTurn = () => {
    turn = !turn;
    return turn;
}

export const logicSpot = (id) => {
    const arr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    let indexId = arr.indexOf(id);
    turn ? logicSpaces[indexId] = 'X': logicSpaces[indexId] = 'O';
    return logicSpaces;
}

// winners
export const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

export const hasWon = () => {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(logicSpaces[a] && (logicSpaces[a] == logicSpaces[b] && logicSpaces[a] == logicSpaces[c])) {
            return [a,b,c];
        }
    }
    return false
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