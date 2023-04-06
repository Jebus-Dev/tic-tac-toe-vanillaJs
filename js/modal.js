import { hasWon, restart, winnerRound, logicSpaces, boardStatus } from "./logic.js";

const btnCloseModal = document.querySelector('#close-modal');
const btnNextRound = document.querySelector('#next-round');
const modal = document.querySelector('#modal');

export const winnerModal = () => {

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
    restart();
    modal.close();
})
