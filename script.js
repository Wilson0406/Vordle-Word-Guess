// import wordList from "./words.js";

const inputs = document.querySelector(".inputs");
const hints = document.querySelector(".hint span");
const typingInput = document.querySelector(".typing-input");
const guess = document.querySelector(".guess-left span");
const wrong = document.querySelector(".wrong-letter span");
const resetBtn = document.querySelector(".reset-btn");

let word;
let incorrects = [];
let corrects = [];
let maxGuess;

function randomWord() {
    // Getting random object from wordList
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; // getting word of random object
    maxGuess = 8;
    corrects = [];
    incorrects = [];
    
    console.log(word);
    // console.log(ranObj.hint);

    hints.innerText = ranObj.hint;
    guess.innerText = maxGuess;
    wrong.innerText = incorrects;

    let html = '';
    for (let i = 0; i < word.length; i++){
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
    
}

randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes( ` ${key}`) && !corrects.includes(key)) {
        console.log(key);
        if(word.includes(key)) { // if user letter is found in the word
            // console.log("Letter found");
            for (let i = 0; i < word.length; i++) {
                // showing matched letter in the input field
                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }                
            }
        } else {
            maxGuess--;
            incorrects.push(` ${key}`);
            console.log("Letter not found");
        }
        guess.innerText = maxGuess;
        wrong.innerText = incorrects;
    }
    
    typingInput.value = "";

    setTimeout(() => {
        if(corrects.length === word.length) {
            alert(`Congratulations! You found the word ${word.toUpperCase()}`);
            randomWord(); // reset game after winning
        }
        else if (maxGuess < 1) {
            alert("Game over! No remaining guesses.");
            for (let i = 0; i < word.length; i++) {
                // show all letters in input
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener('click', randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus()); // for mobile devices
document.addEventListener("keydown", () => typingInput.focus());
