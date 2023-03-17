
const playerOne = (spaceblank) => {
    const ticSvg = `
    <svg class="ex" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M12 5l0 14"></path>
   <path d="M5 12l14 0"></path>
</svg>
    `;

    document.querySelector(`#${spaceblank}`).innerHTML = ticSvg;
        
}

const playerTwo = (spaceblank) => {
    const tacSvg = `
    <svg class="ou" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
</svg>
    `;

    document.querySelector(`#${spaceblank}`).innerHTML = tacSvg;

}


export {
    playerOne,
    playerTwo
}