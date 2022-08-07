import {startTimer, stopTimer} from "./modules/timer.js";
import {easy, medium, hard, easyPage, mediumPage, hardPage} from "./modules/dificulty.js"

const cards = document.querySelectorAll('.card');
const submit = document.getElementById('card-restart');
const modal = document.getElementById('modal')

const btnEasy = document.getElementById('easy');
const btnMedium = document.getElementById('medium');
const btnHard = document.getElementById('hard');

btnEasy.addEventListener('click', easy);
btnMedium.addEventListener('click', medium);
btnHard.addEventListener('click', hard);
submit.addEventListener('click', restart)
cards.forEach(card => card.addEventListener('click', flipCard));


let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

let hits = [];

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  document.body.style.backgroundColor = '#97D2FB';

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.animal === secondCard.dataset.animal) {
    disableCards();
    hits.push(1)
    if(hits.length === 1) startTimer();

    if((easyPage && hits.length === 6) || (mediumPage && hits.length === 10) || (hardPage && hits.length === 15)){
      modal.style.display = "flex"
      stopTimer()
    }
    return;
  }
  document.body.style.backgroundColor = '#e25454ea';
  unflipCards();
}

function disableCards() {
  document.body.style.backgroundColor = '#13f067cc';
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard()
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
    document.body.style.backgroundColor = '#97D2FB';
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

function restart() {
  document.location.reload();
}




