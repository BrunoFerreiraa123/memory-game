let hour = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let stopwatch;

function startTimer() {
  stopTimer();
  reset();
  stopwatch = setInterval(() => timer(), 10)
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

  showTimer();
}

function stopTimer() {
  clearInterval(stopwatch);
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

function showTimer() {
  document.getElementById('hour').innerText = formatTime(hour)
  document.getElementById('minute').innerText = formatTime(minutes)
  document.getElementById('second').innerText = formatTime(seconds)
  document.getElementById('millisecond').innerText = formatTime(milliseconds)
}

function formatTime(num) {
  return num > 10 ? num : `0${num}`
}

export {startTimer, stopTimer}