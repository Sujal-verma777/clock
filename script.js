/* ===============================
   DIGITAL CLOCK
================================ */
function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    document.getElementById("clockTime").innerText =
        `${hours}:${minutes}:${seconds}`;

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];

    document.getElementById("clockDate").innerText =
        `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

setInterval(updateClock, 1000);
updateClock();

/* ===============================
   STOPWATCH LOGIC
================================ */
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;

    let milliseconds = elapsedTime % 1000;
    let seconds = Math.floor(elapsedTime / 1000) % 60;
    let minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    document.getElementById("stopwatchDisplay").innerText =
        `${hours.toString().padStart(2,"0")}:` +
        `${minutes.toString().padStart(2,"0")}:` +
        `${seconds.toString().padStart(2,"0")}.` +
        `${milliseconds.toString().padStart(3,"0")}`;
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateStopwatch, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    document.getElementById("stopwatchDisplay").innerText = "00:00:00.000";
    document.getElementById("lapList").innerHTML = "";
}

function lapTime() {
    if (!isRunning) return;

    const lapItem = document.createElement("li");
    lapItem.innerText = document.getElementById("stopwatchDisplay").innerText;
    document.getElementById("lapList").appendChild(lapItem);
}

/* ===============================
   BUTTON EVENTS
================================ */
document.getElementById("startBtn").addEventListener("click", startStopwatch);
document.getElementById("pauseBtn").addEventListener("click", pauseStopwatch);
document.getElementById("resetBtn").addEventListener("click", resetStopwatch);
document.getElementById("lapBtn").addEventListener("click", lapTime);

/* ===============================
   KEYBOARD CONTROLS
   Space → Start / Pause
   R → Reset
   L → Lap
================================ */
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        isRunning ? pauseStopwatch() : startStopwatch();
    }

    if (event.key.toLowerCase() === "r") {
        resetStopwatch();
    }

    if (event.key.toLowerCase() === "l") {
        lapTime();
    }
});

/* ===============================
   DARK / LIGHT MODE
================================ */
const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
});
