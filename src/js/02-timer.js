import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    dateChosingField: document.body.querySelector('#datetime-picker'),
    
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

console.log('refs.dateChosingField :>> ', refs.dateChosingField);

flatpickr(refs.dateChosingField, options);