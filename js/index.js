`use strict`;

// Target date configuration
const TARGET_DATE_STRING = "February 13, 2026 00:00:00";

// DOM elements
const second_elements = document.querySelectorAll(".seconds");
const minute_elements = document.querySelectorAll(".minutes");
const hour_elements = document.querySelectorAll(".hours");
const day_elements = document.querySelectorAll(".days");

// Validate DOM elements exist
if (
  second_elements.length === 0 ||
  minute_elements.length === 0 ||
  hour_elements.length === 0 ||
  day_elements.length === 0
) {
  console.error("Error: Required DOM elements not found. Please check HTML structure.");
  throw new Error("Required DOM elements missing");
}

// Parse target date with error handling
let targetDate;
try {
  targetDate = new Date(TARGET_DATE_STRING);
  if (isNaN(targetDate.getTime())) {
    throw new Error(`Invalid date format: ${TARGET_DATE_STRING}`);
  }
} catch (error) {
  console.error("Error parsing target date:", error.message);
  // Set a default future date if parsing fails
  targetDate = new Date();
  targetDate.setFullYear(targetDate.getFullYear() + 1);
  console.warn(`Using fallback date: ${targetDate.toLocaleString()}`);
}

const countdown = () => {
  try {
    const countDate = targetDate.getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    // Check if date has passed
    if (gap < 0) {
      clearInterval(intervalID);
      applyChanges(second_elements, 0);
      applyChanges(minute_elements, 0);
      applyChanges(hour_elements, 0);
      applyChanges(day_elements, 0);
      console.info("Countdown has ended. Target date has passed.");
      return;
    }

    // Calculating time units
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Calculate seconds, minutes, hours and days depending on the gap
    const day_counter = Math.floor(gap / day);
    const hour_counter = Math.floor((gap % day) / hour);
    const minute_counter = Math.floor((gap % hour) / minute);
    const second_counter = Math.floor((gap % minute) / second);

    // Apply changes with the help of function
    applyChanges(second_elements, second_counter);
    applyChanges(minute_elements, minute_counter);
    applyChanges(hour_elements, hour_counter);
    applyChanges(day_elements, day_counter);

    // Check if countdown reached zero
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
  } catch (error) {
    console.error("Error in countdown function:", error);
    clearInterval(intervalID);
  }
};

function applyChanges(time_unit_elements, time_counter) {
  // Ensure time_counter is a valid number
  const safeCounter = Math.max(0, Math.floor(time_counter) || 0);
  
  time_unit_elements.forEach((element) => {
    if (element) {
      element.textContent = safeCounter.toString().padStart(2, "0");
    }
  });
}

// Initialize countdown immediately
countdown();

// Set interval for countdown updates
const intervalID = setInterval(countdown, 1000);
