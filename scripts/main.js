import {words} from './constants/words.js';

let word = words[Math.floor(Math.random() * words.length)].split('');
const divWord = document.getElementsByClassName('word')[0];
const input = document.querySelector('input');
const btn = document.getElementById('btn-ok');
const img = document.querySelector('img');
const body = document.querySelector('body');
let counter = 1;

function createSpan (count) {
    if (divWord.children) {
        divWord.innerHTML = '';
    }
    for (let i = 0; i < count; i++) {
        let elem = document.createElement('span');
        elem.textContent = '_';
        divWord.append(elem);
    }
}

function btnRestart () {
    input.disabled = false;
    btn.disabled = false;
    document.getElementsByClassName(`btnRe`)[0].remove();
    body.style.backgroundColor = 'white';
    counter = 1;
    img.src = `img/${counter}.png`;
    word = words[Math.floor(Math.random() * words.length)].split('');
    createSpan(word.length);
}

function startNewGame () {
    const btnRe = document.createElement('button');
    btnRe.classList.add('btnRe');
    btnRe.textContent = 'Restart game';
    btnRe.addEventListener('click', btnRestart);
    body.prepend(btnRe);
}

function getWin () {
    if(![...divWord.children].some((el) => el.textContent === '_')) {
        body.style.backgroundColor = 'green';
        input.disabled = true;
        btn.disabled = true;
        startNewGame();
    }
}

function getLose () {
    body.style.backgroundColor = 'red';
    input.disabled = true;
    btn.disabled = true;
    startNewGame();
}

function correctWordProcessing (value) {
    for (let i =0; i< word.length; i++) {
        if (word[i] === input.value) {
            divWord.children[i].textContent = value;
        }
    }
    getWin();
}

function checkWord () {
    if (word.includes(input.value)) {
        correctWordProcessing(input.value);
    } else {
        img.src = `img/${++counter}.png`;
        if (counter === 6) {
            getLose();
        }
    }
    input.value = '';
}

btn.addEventListener('click', checkWord);
createSpan(word.length);
