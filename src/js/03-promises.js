import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

formEl.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();

  let { delay, step, amount } = readingInputData();

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })

      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
    delay += step;

    function createPromise(position, delay) {
      return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position: position, delay: delay });
        }
        reject({ position: position, delay: delay });
      });
    }
  }
}

function readingInputData() {
  return {
    delay: Number(firstDelay.value),
    step: Number(delayStep.value),
    amount: Number(amountEl.value),
  };
}
