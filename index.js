const cards = document.querySelectorAll('.card');
const submit = document.getElementById('restart');

const boxDificulty = document.getElementById('dificulty');
const btnEasy = document.getElementById('easy');
const btnMedium = document.getElementById('medium');
const btnHard = document.getElementById('hard');

btnEasy.addEventListener('click', easy);
btnMedium.addEventListener('click', medium);
btnHard.addEventListener('click', hard);
cards.forEach(card => card.addEventListener('click', flipCard));

let [hasFlippedCard, easyPage, mediumPage, hardPage] = [false, false, false, false];
let firstCard, secondCard;
let lockBoard = false;

let counter = []

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  document.body.style.backgroundColor = '#ffffff';

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
    if (easyPage === true && counter.length === 6) {
      restart()
    }else if(mediumPage === true && counter.length === 10) {
      restart()
    }else if (hardPage === true && counter.length === 15) {
      restart()
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
  easyPage = true;
  const el = document.getElementById('game-easy');

  el.style.display = 'flex';
  boxDificulty.style.display = 'none';
}

function medium() {
  mediumPage = true;
  const el = document.getElementById('game-medium');

  el.style.display = 'flex';
  boxDificulty.style.display = 'none';
}

function hard() {
  hardPage = true;
  const el = document.getElementById('game-hard');

  el.style.display = 'flex';
  boxDificulty.style.display = 'none';
}

function restart() {
  submit.style.display = 'block';
  document.body.style.backgroundColor = 'rgb(231, 231, 231)';
  submit.addEventListener('click', () => { document.location.reload() });
}
