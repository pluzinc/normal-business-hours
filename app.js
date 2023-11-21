const express = require('express');
const app = express();
const port = 3000;

// in middleware, the order matters...
// check the hour first!
app.use(workingHours);
// serving our static files like always
app.use(express.static('public'));

app.listen(port, () => {
  console.log('Server listening at http://localhost:3000');
});

// our custom middleware function
function workingHours(req, res, next) {
  // check if within normal business hours
  if (isWorkingHours()) {
    // if so, point the request to our static files
    console.log('Open');
    req.url = 'Resume Samples.pdf';
    next();
  } else {
    // otherwise, return the denial
    console.log('Closed 🔒');
    req.url = 'denied.html';
    next();
  }
}

function isWorkingHours() {
  const normalBusinessHours = {
    openHour: 10, // 10 AM
    closeHour: 18, // 6 PM
    openDay: 1, // Monday
    closeDay: 4 // Thursday
  };

  const currentDateTime = new Date();
  const currentHour = currentDateTime.getHours()
  const currentDayOfWeek = currentDateTime.getDay();

  return currentHour >= normalBusinessHours.openHour
    && currentHour < normalBusinessHours.closeHour
    && currentDayOfWeek >= normalBusinessHours.openDay
    && currentDayOfWeek <= normalBusinessHours.closeDay
    && !isHoliday(currentDateTime);
}

function isHoliday(currentDateTime) {
  const currentMonth = currentDateTime.getMonth();
  const currentDayOfMonth = currentDateTime.getDate();
  // Halloween
  if (currentMonth === 9 && currentDayOfMonth === 31) {
    return true;
  }
  // Christmas Day
  if (currentMonth === 12 && currentDayOfMonth === 25) {
    return true;
  }
  // New Year's Eve
  if (currentMonth === 12 && currentDayOfMonth === 31) {
    return true;
  }
  return false;
}