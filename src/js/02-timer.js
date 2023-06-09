import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
startBtn.disabled = true;

const fp = flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.setAttribute('disabled', 'disabled');
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        changeTimerValue(selectedDates[0]);
      });
    }
  },
});

const timerValue = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

function changeTimerValue() {
  let timer = setInterval(() => {
    let countdown = new Date(inputEl.value) - new Date();
    startBtn.disabled = true;
    inputEl.disabled = true;
    if (countdown >= 0) {
      let timerData = convertMs(countdown);
      timerValue.days.textContent = timerData.days;
      timerValue.hours.textContent = timerData.hours;
      timerValue.minutes.textContent = timerData.minutes;
      timerValue.seconds.textContent = timerData.seconds;
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
