const boxDificulty = document.getElementById('dificulty');
const box = document.getElementById('box');
const submit = document.getElementById('card-restart');


let [easyPage, mediumPage, hardPage] = [false, false, false];
let width;

function easy() {
    easyPage = true;
    width = window.innerWidth;
    if (width === 1440) {
        submit.style.justifyContent = 'flex-end';
    }
    const el = document.getElementById('game-easy');
    showGame(el);
}

function medium() {
    mediumPage = true;
    const el = document.getElementById('game-medium');
    showGame(el);
}

function hard() {
    hardPage = true
    width = window.innerWidth;
    if (width === 1680) {
        submit.style.justifyContent = 'center';
    }
    const el = document.getElementById('game-hard');
    showGame(el)
}

function showGame(el) {
    el.style.display = 'flex';
    submit.style.display = 'flex';
    boxDificulty.style.display = 'none';
    box.style.display = 'none';
}

export { easy, medium, hard, easyPage, mediumPage, hardPage }