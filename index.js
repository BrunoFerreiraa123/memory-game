const cards = document.querySelectorAll('.card');
const box = document.getElementById('box');
const submit = document.getElementById('card-restart');
const modal = document.getElementById('modal')

const boxDificulty = document.getElementById('dificulty');
const btnEasy = document.getElementById('easy');
const btnMedium = document.getElementById('medium');
const btnHard = document.getElementById('hard');

btnEasy.addEventListener('click', easy);
btnMedium.addEventListener('click', medium);
btnHard.addEventListener('click', hard);
submit.addEventListener('click', restart)
cards.forEach(card => card.addEventListener('click', flipCard));

let [hasFlippedCard, easyPage, mediumPage, hardPage] = [false, false, false, false];
let firstCard, secondCard;
let lockBoard = false;

let counter = [];

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
    counter.push(1);
    if(easyPage === true && counter.length === 6) {
      modal.style.display = "block"
    }else if (mediumPage === true && counter.length === 10) {
      modal.style.display = "block"
    }else if (hardPage === true && counter.length === 15) {
      modal.style.display = "block"
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
  easyPage = true
  const el = document.getElementById('game-easy');
  showGame(el)
}

function medium() {
  mediumPage = true
  const el = document.getElementById('game-medium');
  showGame(el)
}

function hard() {
  hardPage = true
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

const inicio = document.getElementById('inicio');
const fim = document.getElementById('fim');

inicio.addEventListener('click', iniciaCronometro);
fim.addEventListener('click', pausaCronometro);

let hour = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let cronometro;

function iniciaCronometro() {
  pausaCronometro();
  reset();
  cronometro = setInterval(() => timer(), 10)
}

function timer() {
  if ((milliseconds += 10) === 1000) {
    milliseconds = 0;
    seconds++
  };
  if (seconds === 60) {
    seconds = 0;
    minutes++
  };
  if (hour === 60) {
    minutes = 0;
    hour++
  }

  exibeTempo();
}

function pausaCronometro() {
  clearInterval(cronometro);
  // exibeTempo()
}

function reset() {
  hour = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  document.getElementById('hour').innerText = '00';
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
    document.getElementById('millisecond').innerText = '00';
}

function exibeTempo() {
  document.getElementById('hour').innerText = formatTime(hour)
  document.getElementById('minute').innerText = formatTime(minutes)
  document.getElementById('second').innerText = formatTime(seconds)
  document.getElementById('millisecond').innerText = formatTime(milliseconds)
}

function formatTime(num) {
  return num > 10 ? num : `0${num}`
}

