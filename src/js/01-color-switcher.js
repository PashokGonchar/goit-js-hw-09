function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

let bodyEl = document.querySelector('body');
let changeColorEl = document.querySelector('.change-color');

function getChangeColor() {
  let color = getRandomHexColor();
  bodyEl.style.backgroundColor = color;
}

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
      getChangeColor();
    if ((startBtn.isActive = true)) {
        startBtn.setAttribute('disabled', 'disabled');
    }
  }, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    if ((startBtn.disabled = true)) {
      startBtn.removeAttribute('disabled', 'disabled');
    }
});
