// Described in the documentation
import iziToast from 'izitoast';
// Optional import of styles
import 'izitoast/dist/css/iziToast.min.css';

let isSuccess = true;

let delay = null;
let state = null;

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const form = event.target;
  delay = form.elements.delay.value;
  state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(
          iziToast.show({
            title: 'Fullfiled',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
            color: 'green',
          })
        );
      } else {
        reject(
          iziToast.show({
            title: 'Rejected',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
            color: 'red',
          })
        );
      }
    }, delay);
  });

  promise
    .then(value => {
      // Promise fulfilled
    })
    .catch(error => {
      // Promise rejected
    });
});
