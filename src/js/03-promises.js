import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

  const onButtonClickTime = new Date();
  const value = Number(refs.amount.value);
  const step = Number(refs.step.value);
  let delay = Number(refs.delay.value);  
  let countOfIntervalsRounds = 0;
  let delayPlusStep = delay;
  let promiceNumber = 1;

  setTimeout(() => {
    const firstTimeTriggerAlert = new Date();
    console.log('First time trigger =>', firstTimeTriggerAlert - onButtonClickTime);

    let intervalID = setInterval(() => {
      if (countOfIntervalsRounds === value) {
        clearInterval(intervalID);
        return
      }
      createPromise(promiceNumber, delayPlusStep).then(({ position, delay }) => Notify.success(`Fulfilled promise ${position} in ${delay}ms`)).catch(({ position, delay }) => Notify.failure(`Rejected promise ${position} in ${delay}ms`));
      promiceNumber += 1;
      delayPlusStep = delay += step;
      countOfIntervalsRounds += 1;
    }, step)
  }, delay)
}

const createPromise = ((position, delay) => new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      shouldResolve ? resolve({ position, delay }) : reject({ position, delay })
    }))

