import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/material_red.css");
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import JSConfetti from 'js-confetti';

const refs = {
  dateChosingField: document.body.querySelector('#datetime-picker'),
  buttonStart: document.body.querySelector('button[data-start]'),
  daysEl: document.body.querySelector('[data-days]'),
  hoursEl: document.body.querySelector('[data-hours]'),
  minutesEl: document.body.querySelector('[data-minutes]'),
  secondsEl: document.body.querySelector('[data-seconds]'),
  intervalID: null,
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log('object :>> ', selectedDates[0]);
    validationOfChoosedDate(selectedDates[0]);
  },
};

refs.buttonStart.addEventListener('click', startCountdown);
refs.buttonStart.disabled = true;

flatpickr(refs.dateChosingField, options);

function validationOfChoosedDate (date) {
  const now = new Date();
  const diff = date - now;

  if (diff <= 0) {
    refs.buttonStart.disabled = true;
    Notify.init({clickToClose: true, timeout: 2000, position: 'center-top'});
    Notify.failure("Please choose a date in the future", );
    return
  }
  else {
    refs.buttonStart.disabled = false;   
    return;
  }
}

function startCountdown() {
  refs.buttonStart.disabled = true;
  refs.dateChosingField.disabled = true;
  refs.intervalID = setInterval(() => countdownRound(), 1000);  
  clearCountdown();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function countdownRound() {
  const now = new Date();
    const date = new Date(refs.dateChosingField.value);
  const diff = date - now;
  if (diff <= 0) {
      clearInterval(refs.intervalID);
      addConfeti(4);
      return
    }
    const { days, hours, minutes, seconds } = convertMs(diff);
    refs.daysEl.textContent = pad(days);
    refs.hoursEl.textContent = pad(hours);
    refs.minutesEl.textContent = pad(minutes);
    refs.secondsEl.textContent = pad(seconds); 
}

function clearCountdown() {
  refs.buttonStart.insertAdjacentHTML('afterend', '<button type="button" data-stop style="margin-left: 10px">Clear</button>');
  const buttonClear = document.body.querySelector('button[data-stop]');

  buttonClear.addEventListener('click', () => {
    clearInterval(refs.intervalID);
    refs.buttonStart.disabled = false;
    refs.dateChosingField.disabled = false;
    buttonClear.remove();
    refs.daysEl.textContent = '00';
    refs.hoursEl.textContent = '00';
    refs.minutesEl.textContent = '00';
    refs.secondsEl.textContent = '00';
  });
}

function pad (value) {
  return value.toString().padStart(2, '0');
}

function addConfeti(num) {
  let count = 0;
  const confetti = new JSConfetti(document.body);
  let intervalConfeti = setInterval(() => {
    count += 1;
    if (count === num) {
      clearInterval(intervalConfeti);
    }
    confetti.addConfetti({
      emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸', '🦄', '🎉'],
      emojiSize: 20,
      confettiNumber: 50,
    });
  }, 1000);
}

