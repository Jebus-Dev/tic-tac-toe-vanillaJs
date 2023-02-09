
const newGameButton = document.querySelector('#newGame');
const board  = (document.querySelectorAll('.spot'));
const print = document.querySelector("#chartContainer");
let turn = true;
let logicSpaces = new Array(9);

const printTic = (spaceblank) => {
    const htmlPrint = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 ex"><path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" /></svg>
    `;

    const svg = document.createElement('svg');
    svg.innerHTML = htmlPrint;

    document.querySelector(`#${spaceblank}`).innerHTML = htmlPrint;
        
}

const printTac = (spaceblank) => {
    const htmlPrint = `
    <svg class="ou" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497 8.497-3.807 8.497-8.497-3.807-8.498-8.497-8.498z" fill-rule="nonzero"/></svg>
    `;

    const svg = document.createElement('svg');
    svg.innerHTML = htmlPrint;

    document.querySelector(`#${spaceblank}`).innerHTML = htmlPrint;
        
}

const restartGame = () => {
    for (const element of board) {
        element.firstElementChild.remove();
    }
    turn = true;
}

const toggleTurn = () => {
    turn = !turn;
}

const logic = (id) => {
    const arr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    let indexId = arr.indexOf(id);
    turn ? logicSpaces[indexId] = 'X': logicSpaces[indexId] = 'O';
    playerHasWon();
}

// winners
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

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(logicSpaces[a] && (logicSpaces[a] == logicSpaces[b] && logicSpaces[a] == logicSpaces[c])) {
            return [a,b,c]
        }
    }
    return false
}


// eventos

print.addEventListener('click', (e) => {
    let spaceClass = e.target.className;
    let space  = e.target.id;
    
    if (spaceClass == "spot" ) {
        turn == true ? printTic(space) 
                     : printTac(space);
        logic(space)
        toggleTurn();
    }else {
        console.log(" no es un espacio valido ");
    }

})

restartGame();

