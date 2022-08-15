let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let stopwatch;

function startTimer() {
  stopTimer();
  reset();
  stopwatch = setInterval(() => timer(), 1000)
}

function timer() {
  seconds ++;
  
  if (seconds === 60) {
    seconds = 0;
    minutes++
  };

  showTimer();
}

function stopTimer() {
  clearInterval(stopwatch);
}

function reset() {
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
}

function showTimer() {
  document.getElementById('minute').innerText = formatTime(minutes)
  document.getElementById('second').innerText = formatTime(seconds)
}

function formatTime(num) {
  return num >= 10 ? num : `0${num}`
}

export {startTimer, stopTimer}