const INTERVAL_TIME = 1000;
let intervalID = null;
const refs = {
    startBtn: document.body.querySelector('[data-start]'),
    stopBtn: document.body.querySelector('[data-stop]'),
    body: document.body
};

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    intervalID = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, INTERVAL_TIME);
    this.disabled = true;
    refs.stopBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStopBtnClick() {
    clearInterval(intervalID);
    this.disabled = true
    refs.startBtn.disabled = false;
}
