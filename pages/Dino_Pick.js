let guessCount = 0;
let cluesRevealed = false;

let dinos = [];
let dinoNames = [];


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

//Dino Json
function updateDetails(query){
    const list = document.getElementById("dino-list");
    list.innerHTML = "";

    const q = query.trim().toLowerCase();
    if(!q) return;

    const matches = dinoNames
    .filter(name => name.toLowerCase().includes(q))
    .slice(0,20); // 20 names max

    for(const name of matches){
        const opt = document.createElement("option");
        opt.value = name;
        list.appendChild(opt);
    }
}

document.addEventListener("DOMContentLoaded",async () => {
    await loadDinos();

    const input = document.getElementById("user-input");
    input.addEventListener("input", () => updateDetails(input.value));
    input.addEventListener("focus", () => updateDetails(input.value))
});


//Fetch Commmands
async function loadDinos() {
    const res = await fetch("../json_packages/dinos.json");
    if(!res.ok) throw new Error("Failed to get json");
    const data = await res.json();

    dinos = Array.isArray(data.dinos) ? data.dinos : [];
    dinoNames = dinos
    .map(d => d?.name)
    .filter(Boolean)
    .sort((a,b) => a.localeCompare(b));
}

