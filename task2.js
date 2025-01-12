
let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  const milliseconds = String(ms % 1000).padStart(3, "0").slice(0, 2);
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;

    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  updateDisplay();
  laps.innerHTML = "";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}

function recordLap() {
  const lapTime = document.createElement("li");
  lapTime.textContent = formatTime(elapsedTime);
  laps.appendChild(lapTime);
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
