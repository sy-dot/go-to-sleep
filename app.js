// This is what is used to run commands like shutdown
const exec = require('child_process').exec;

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => { 
        callback(stdout); 
    });
};



let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
// clear any existing timers
clearInterval(countdown);

const now = Date.now();
const then = now + seconds * 1000;
displayTimeLeft(seconds);

countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if(secondsLeft < 0) {
    clearInterval(countdown);
    console.log("Time to shutdown computer");
    execute('shutdown "/p"', function(output){
        console.log("Shutting down")
    });
    return;
    }
    // display it
    displayTimeLeft(secondsLeft);
}, 1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds/60);
    const remainderSeconds = seconds % 60; 
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;``
    document.title = display;
    timerDisplay.textContent = display;
}


function startTimer() {
const seconds = parseInt(this.dataset.time);
timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
e.preventDefault();
const mins = this.minutes.value;
console.log(mins);
timer(mins * 60);
this.reset();
});