import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "../css/style.css";
import "../css/Dino_Pick.css";

import BarChart from "../assets/icons/bar-chart.svg";
import FireSymbol from "../assets/icons/fire.svg";
import QuestionMark from "../assets/icons/question.svg";
import NotePad from "../assets/icons/note.svg";
import ReturnPad from "../assets/icons/enter.svg";
// import PlayersFinished from ; //Backend holds the Player guess data


export default function DinoPick() {

    const [guessCount, setGuessCount] = useState(0);
    const [cluesRevealed, setCluesRevealed] = useState(false);

    const [dinos, setDinos] = useState([]);
    const [dinoNames, setDinoNames] = useState([]);

    const [guess, setGuess] = useState("");
    const [matches, setMatches] = useState([]);

    const clueUnlocks = useMemo(() => [5, 10, 15], []);

    useEffect(() => {
        let cancelled = false;

        async function loadDinos() {
        const res = await fetch("/Json/dinos.json");
        if (!res.ok) throw new Error("Failed to get json");
        if(res.ok) console.log("JSON Fetched");

        const data = await res.json();
        // for (const dino of data.dinos) {
        //     console.log(dino.name);
        // }

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

    function onPlayerGuess() {
        const finalGuess = getFinalGuess(guess);
        if (!finalGuess) return;

        const nextCount = guessCount + 1;
        setGuessCount(nextCount);

        if (!cluesRevealed && nextCount >= 1) {
            setCluesRevealed(true);
        }

        console.log("Guess submitted:", finalGuess);

        setDinoNames((prev) => prev.filter((name) => name.toLowerCase() !== finalGuess.toLowerCase()));

        setGuess("");
        setMatches([]);
    }


    function onKeyDown(e) {
        if (e.key === "Enter") onPlayerGuess();

        if (e.key === "Tab") {
            if (matches.length > 0) {
            e.preventDefault();          
            autocompleteFirstMatch();    
        }
    return;
        }
    }

    function clueUnlocked(unlockAt) {
        return guessCount >= unlockAt;
    }

    function getFinalGuess(rawInput) {
        const trimmed = rawInput.trim();
        if (!trimmed) return "";

        const exact = dinoNames.find(
            (n) => n.toLowerCase() === trimmed.toLowerCase()
        );
        if (exact) return exact;

        if (matches.length > 0) return matches[0];

        return trimmed;
    }

    function autocompleteFirstMatch() {
        if (!matches || matches.length === 0) return;
        const first = matches[0];
        setGuess(first);
        updateDetails(first);
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

            <div className="options-stuffs">
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

            <div className="guess-clues">
                <h3>Guess the Dino of the Day!</h3>

                <div className="hidden-clues is-hidden">
                    <button className="clue-btn" data-unlock="5">
                        <img src={null} alt="Clue 1" />
                        <h4>Roar</h4>
                    </button>

                    <button className="clue-btn" data-unlock="10">
                        <img src={null} alt="Clue 2" />
                        <h4>Roar</h4>
                    </button>

                    <button className="clue-btn" data-unlock="15">
                        <img src={null} alt="Clue 3" />
                        <h4>Roar</h4>
                    </button>
                </div>
            </div>

            <div className="player-inputs">
                <input
                    type="text"
                    id="user-input"
                    name="user-input"
                    placeholder="Enter Answer"
                    list="dino-list"
                    autoComplete="on"
                    value={guess ?? ""}
                    onChange={(e) => {
                        const v = e.target.value;
                        setGuess(v);
                        updateDetails(v);
                    }}
                    onFocus={() => updateDetails(guess ?? "")}
                    onKeyDown={onKeyDown}
                />


                <datalist id="dino-list">
                    {matches.map((name) => (
                    <option key={name} value={name} />
                    ))}
                </datalist>

                <button type="button" id="submit-btn" onClick={onPlayerGuess}>
                    <img src={ReturnPad} alt="Enter" />
                </button>
                </div>

            <p className="players-finished">Player's found so far {/*PlayersFinished*/"0"}!</p>

            <div className="player-guesses">
                
            </div>

            <p className="last-option">Last Dino was</p>

        </div>
    );
}