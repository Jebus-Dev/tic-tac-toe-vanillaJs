
export let scorepvp = {
    tic: 0,
    draw: 0,
    tac: 0
}

export let scorebot = {
    tic: 0,
    draw: 0,
    tac: 0
}

export const setScores = (mode) => {
    let scores = mode == 'scorepvp' ? scorepvp : scorebot;

    localStorage.setItem (`${mode}`, JSON.stringify(scores));
}

const getScores = (mode) => {
    
    const scoresJSON = JSON.parse(localStorage.getItem(`${mode}`));
    if (scoresJSON) {
        return scoresJSON;
    } else {
        return {
            tic: 0,
            draw: 0,
            tac: 0
        };
    }

}

export const scoreLocalStorage = (mode) => {
    
    let scores = mode == 'scorepvp' ? scorepvp: scorebot;

    const scoresRecuperados = getScores(mode);
    scores.tic = scoresRecuperados.tic;
    scores.draw = scoresRecuperados.draw;
    scores.tac = scoresRecuperados.tac;
    document.querySelector('#score-tic').innerHTML = scoresRecuperados.tic;
    document.querySelector('#score-draw').innerHTML = scoresRecuperados.draw;
    document.querySelector('#score-tac').innerHTML = scoresRecuperados.tac;
    
}