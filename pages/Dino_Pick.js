let guessCount = 0;
let cluesRevealed = false;

const cluesContainer = document.querySelector(".hidden-clues");
const clueButton = document.querySelectorAll(".clue-btn");

const input = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");

function onPlayerGuess() {

    const guess = input.value.trim();
    if(!guess) return;

    console.log(guess)
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

    input.value = "";
}

submitBtn.addEventListener("click", onPlayerGuess);
input.addEventListener("keydown", e => {
    if(e.key == "Enter"){
        onPlayerGuess();
    }
})