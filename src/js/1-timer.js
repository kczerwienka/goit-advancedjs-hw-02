// Described in the documentation
import flatpickr from 'flatpickr';
// Optional import of styles
import 'flatpickr/dist/flatpickr.min.css';
// Described in the documentation
import iziToast from 'izitoast';
// Optional import of styles
import 'izitoast/dist/css/iziToast.min.css';

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

  const daysString = addLeadingZero(days);
  const hoursString = addLeadingZero(hours);
  const minutesString = addLeadingZero(minutes);
  const secondsString = addLeadingZero(seconds);

  return { daysString, hoursString, minutesString, secondsString };
}

function calculateDifference() {
  let timeDelta = userSelectedDate - Date.now();

  if (timeDelta < 0) {
    clearInterval(intervalId);
    startButton.disabled = false;
    datetimePicker.disabled = false;
  } else {
    return changeHTML(convertMs(timeDelta));
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function changeHTML(time) {
  const timeArray = Object.values(time);
  values.forEach((element, index) => {
    console.log(element, index);
    element.textContent = timeArray[index];
  });
}

const today = Date.now();

const startButton = document.querySelector('button');
startButton.disabled = true;

const datetimePicker = document.querySelector('#datetime-picker');

const values = document.querySelectorAll('.value');

let userSelectedDate;

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > today) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      startButton.disabled = false;
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      // window.alert('Please choose a date in the future');
      startButton.disabled = true;
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

startButton.addEventListener('click', event => {
  startButton.disabled = true;
  datetimePicker.disabled = true;

  intervalId = setInterval(calculateDifference, 1000);
});
