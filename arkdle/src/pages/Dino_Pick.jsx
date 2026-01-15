import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "../css/style.css";
import "../css/Dino_Pick.css";

//Images
import BarChart from "../assets/icons/bar-chart.svg";
import FireSymbol from "../assets/icons/fire.svg";
import QuestionMark from "../assets/icons/question.svg";
import NotePad from "../assets/icons/note.svg";
import ReturnPad from "../assets/icons/enter.svg";
//"../icons/bar-chart.svg"
export default function DinoPick() {

    const [guessCount, setGuessCount] = useState(0);
    const [cluesRevealed, setCluesRevealed] = useState(false);

    const [dinos, setDinos] = useState([]);
    const [dinoNames, setDinoNames] = useState([]);

    const [guess, setGuess] = useState("");
    const [matches, setMatches] = useState([]);

    // Your clue unlock thresholds (from data-unlock)
    const clueUnlocks = useMemo(() => [5, 10, 15], []);

    // -------------------------
    // Fetch dinos.json once (replaces DOMContentLoaded + loadDinos())
    // -------------------------
    useEffect(() => {
        let cancelled = false;

        async function loadDinos() {
        // ✅ Put file at: public/json_packages/dinos.json
        const res = await fetch("/json_packages/dinos.json");
        if (!res.ok) throw new Error("Failed to get json");

        const data = await res.json();

        const arr = Array.isArray(data.dinos) ? data.dinos : [];
        const names = arr
            .map((d) => d?.name)
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b));

        if (!cancelled) {
            setDinos(arr);
            setDinoNames(names);
        }
        }

        loadDinos().catch(console.error);
        return () => {
        cancelled = true;
        };
    }, []);

    // -------------------------
    // Datalist suggestions (replaces updateDetails() + list.innerHTML)
    // -------------------------
    function updateDetails(query) {
        const q = query.trim().toLowerCase();
        if (!q) {
        setMatches([]);
        return;
        }

        const next = dinoNames
        .filter((name) => name.toLowerCase().includes(q))
        .slice(0, 20);

        setMatches(next);
    }

    // -------------------------
    // Guess submit (replaces onPlayerGuess + event listeners)
    // -------------------------
    function onPlayerGuess() {
        const trimmed = guess.trim();
        if (!trimmed) return;

        const nextCount = guessCount + 1;
        setGuessCount(nextCount);

        // Reveal clue container after 1 guess (same as your JS)
        if (!cluesRevealed && nextCount >= 1) {
        setCluesRevealed(true);
        }

        console.log("Guess:", trimmed);

        // Clear input (same as input.value = "")
        setGuess("");
        setMatches([]);
    }

    function onKeyDown(e) {
        if (e.key === "Enter") onPlayerGuess();
    }

    function clueUnlocked(unlockAt) {
        return guessCount >= unlockAt;
    }



    return (
        <div className="home-center">
            <div className="tab-holders">
                <NavLink to="/dino" className="home-link">
                    Dino
                </NavLink>

                <NavLink to="/npc" className="home-link">
                    NPC Quote
                </NavLink>

                <NavLink to="/map" className="home-link">
                    Which Map
                </NavLink>
            </div>

            <div class="options-stuffs">
                <nav>
                    <a href="#" title="Stats">
                        <img src={BarChart} alt="Stats" />
                    </a>
                    <a href="#" title="Streak">
                        <img src={FireSymbol} alt="Streak" />
                    </a>
                    <a href="#" title="How To Play">
                        <img src={QuestionMark} alt="How To Play" />
                    </a>
                    <a href="#" title="Patch Notes">
                        <img src={NotePad} alt="Patch Notes" />
                    </a>
                </nav>
            </div>

            <div class="guess-clues">
                <h3>Guess the Dino of the Day!</h3>

                <div class="hidden-clues is-hidden">
                    <button class="clue-btn" data-unlock="5">
                        <img src="" alt="Clue 1" />
                        <h4>Roar</h4>
                    </button>

                    <button class="clue-btn" data-unlock="10">
                        <img src="" alt="Clue 2" />
                        <h4>Roar</h4>
                    </button>

                    <button class="clue-btn" data-unlock="15">
                        <img src="" alt="Clue 3" />
                        <h4>Roar</h4>
                    </button>
                </div>
            </div>

            <div class="player-inputs">
                <input type="text" id="user-input" name="user-input" placeholder="Enter Answer" list="dino-list" autocomplete="on" />

                <datalist id="dino-list">
                </datalist>


                <button type="button" id="submit-btn">
                    <img src={ReturnPad} alt="Enter" />
                </button>
            </div>

        </div>
    );
}