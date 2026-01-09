let guessCount = 0;
let cluesRevealed = false;

const cluesContainer = document.querySelector(".hidden-clues");
const clueButton = document.querySelectorAll(".clue-btn");

function onPlayerGuess() {
    guessCount++;

    if(!cluesRevealed && guessCount >= 1){
        cluesContainer.classList.remove("is-hidden");
        cluesRevealed = true;
    }

    clueButton.forEach(a => {
        const unlockAt = Number(a.dataset.unlock);
        if(guessCount >= unlockAt){
            a.classList.add("unlocked");
        }
    });
}