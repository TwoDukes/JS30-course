let countdown;
const origTitle = document.title;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
document.customForm

function timer(seconds){
    clearInterval(countdown);
    const now = Date.now();
    const then = now + (seconds * 1000);
    displayTimeLeft(seconds);
    displayEndTime(then);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //check if we should stop it
        if(secondsLeft < 0){
            clearInterval(countdown);
            document.title = origTitle;
            return;
        }
        //display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}


function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    remainderSeconds = (seconds % 60);
    const displayTime = `${minutes}:${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`;
    document.title = displayTime;
    timerDisplay.textContent = displayTime;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour > 12 ? (hour - 12):hour}:${minutes < 10 ? '0': ''}${minutes} ${hour > 12?'pm':'am'} `;
}

function startTimer(){
    const seconds = this.dataset.time;
    timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mins = e.target[0].value;
    timer(mins * 60);
    e.target[0].value = '';
});