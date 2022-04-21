import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
}


refs.submitBtn.addEventListener('click', onSubmitClick);

function onSubmitClick(e) {
  e.preventDefault();

  const value = Number(refs.amount.value);
  const step = Number(refs.step.value);
  let delay = Number(refs.delay.value);  
  let count = 0;
  let promiceNumber = 1;
  
  setTimeout(() => {
    let intervalID = setInterval(() => {
    

    if (count === value) {
      clearInterval(intervalID);
      return
    }
    else {
      createPromise(promiceNumber, delay).then(({ position, delay }) => Notify.success(`Fulfilled promise ${position} in ${delay}ms`)).catch(({ position, delay }) => Notify.failure(`Rejected promise ${position} in ${delay}ms`));
      promiceNumber += 1;
      delay += step;
    } count += 1;
  }, step)
  }, delay)
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout
    if (shouldResolve) {
      resolve({position, delay});
    }
    else {
      reject({position, delay});
    };
    }
  );
}
