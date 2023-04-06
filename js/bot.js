import { logicSpaces, botGame } from "./logic.js";

export let logicSpacesBot = ['one', 'two', 'three', 'four', 'five','six', 'seven', 'eight', 'nine'];

export const botMovement = () => {

    let random = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    if ( logicSpaces[random] != '' ) {
        return botMovement();
    } else {
        setTimeout(() => {
            botGame(logicSpacesBot[random]);
        }, 500);
    }
}





