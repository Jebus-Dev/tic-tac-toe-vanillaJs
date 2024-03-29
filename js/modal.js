import { hasWon, restartGame, winnerRound, logicSpaces, boardStatus } from './logic.js';
import { radioMode } from './storage.js';
const btnCloseModal = document.querySelector('#close-modal');
const btnNextRound = document.querySelector('#next-round');
const modal = document.querySelector('#modal');

export const winnerModal = () => {
    let winnerp;
    modal.classList.add("modal-show");
    const firstElement = modal.lastElementChild;
    const winner = document.createElement("p");
    if (winnerRound == 'O' && radioMode == 'scorebot') {
        winnerp = '😭YOU LOSE😭';
    } else {
        winnerp = '🎉YOU WIN🎉';
    }

    if (winnerRound !== "draw") {

      const classWinner = winnerRound === "X" ? "paragraph-winner-tic" : "paragraph-winner-tac";
  
      winner.innerHTML = `
        <p class="u-won"> ${winnerp} </p>
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




export const cleanModal = () => {
    if (hasWon() || logicSpaces.every(boardStatus)) {
        modal.firstElementChild.remove();
    }
}

btnCloseModal.addEventListener('click', () => {
    modal.close();
    modal.classList.remove('modal-show');
})

btnNextRound.addEventListener('click', () => {
    restartGame();
    modal.close();
})
