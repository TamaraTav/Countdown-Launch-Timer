`use strict`;

let second_elements = document.querySelectorAll(".seconds");
let minute_elements = document.querySelectorAll(".minutes");
let hour_elements = document.querySelectorAll(".hours");
let day_elements = document.querySelectorAll(".days");

let countdown = () => {
  let countDate = new Date("December 31, 2023 00:00:00").getTime();
  let now = new Date().getTime();
  let gap = countDate - now;

  // calculating time units
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;

  // calculate seconds, minutes, hours and days depending on the gap
  let day_counter = Math.floor(gap / day);
  let hour_counter = Math.floor((gap % day) / hour);
  let minute_counter = Math.floor((gap % hour) / minute);
  let second_counter = Math.floor((gap % minute) / second);

  // appling changes with the help of function
  applyChanges(second_elements, second_counter);
  applyChanges(minute_elements, minute_counter);
  applyChanges(hour_elements, hour_counter);
  applyChanges(day_elements, day_counter);

  if (
    day_counter <= 0 &&
    hour_counter <= 0 &&
    minute_counter <= 0 &&
    second_counter <= 0
  ) {
    clearInterval(intervalID);
    applyChanges(second_elements, 0);
    applyChanges(minute_elements, 0);
    applyChanges(hour_elements, 0);
    applyChanges(day_elements, 0);
  }
};

function applyChanges(time_unit_elements, time_counter) {
  time_unit_elements.forEach((element) => {
    element.textContent = time_counter.toString().padStart(2, "0");
  });
}

let intervalID = setInterval(countdown, 1000);

// second method

// let flip_card = document.querySelectorAll(".animation");
// let days_elements = document.querySelectorAll(".days");
// let hours_elements = document.querySelectorAll(".hours");
// let mintues_elements = document.querySelectorAll(".minutes");
// let seconds_elements = document.querySelectorAll(".seconds");

// function timer() {
//     // get element values
//     let days = getTimeUnits(days_elements);
//     let hours = getTimeUnits(hours_elements);
//     let minutes = getTimeUnits(mintues_elements);
//     let seconds = getTimeUnits(seconds_elements);

//     // reduce seconds by 1
//     seconds--;
//     numberChange(seconds_elements, seconds);

//     // change time(minutes, hours, days)
//     timeChange(seconds, minutes, seconds_elements, mintues_elements, 60, 3);
//     timeChange(minutes, hours, mintues_elements, hours_elements, 59, 2);
//     timeChange(hours, days, hours_elements, days_elements, 23, 1);

//     // check for endpoint
//     if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
//         clearInterval(intervalID);
//     }

// }

// // function for time change
// function timeChange(time_unit, time_unit_plus, time_unit_elements, time_unit_elements_plus, reset_value, i) {
//     if (time_unit < 0) {
//         numberChange(time_unit_elements, reset_value);
//         time_unit_plus--;
//         numberChange(time_unit_elements_plus, time_unit_plus);
//         animation[i].classList.add(".animate-top");
//         animation[i].classList.add(".animate-bottom");
//     }
// }

// // function for getting text content of DOM elements
// function getTimeUnits(time_unit_element) {
//     return Number(time_unit_element[0].textContent);
// }

// // function for time number change format
// function numberChange(time_unit_element, time_unit) {
//     time_unit_element.forEach(e => {
//         e.textContent = time_unit.toString().padStart(2, "0");
//     });
// }

// // calls timer function every 1 second
// const intervalID = setInterval(timer, 1000);
