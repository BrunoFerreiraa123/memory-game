const cards = document.querySelectorAll('.card');
const box = document.getElementById('box');
const submit = document.getElementById('card-restart');

const boxDificulty = document.getElementById('dificulty');
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

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  document.body.style.backgroundColor = 'rgb(117, 117, 117';

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

    resetBoard()
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

function easy() {
  const el = document.getElementById('game-easy');
  showGame(el)
}

function medium() {
  const el = document.getElementById('game-medium');
  showGame(el)
}

function hard() {
  const el = document.getElementById('game-hard');
  showGame(el)
}

function restart() {
  document.location.reload();
}

function showGame(el) {
  el.style.display = 'flex';
  submit.style.display = 'flex';
  boxDificulty.style.display = 'none';
  box.style.display = 'none';
}