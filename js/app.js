const calendarTable = document.getElementById("table-calendar");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

let maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let firstMonthIndexes = [26, 27, 28, 29, 30, 31].reverse();
let allDays = [],
  newArr = [],
  totalArr = [],
  calendarIndex = [],
  allTrs = [];

let counter = -1;
let initialIndex = 0;

eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", createCalendarController);
  leftButton.addEventListener("click", previousMonthController);
  rightButton.addEventListener("click", nextMonthController);
}

maxDays.forEach((max) => {
  for (let i = 1; i <= max; i++) {
    allDays.push(i);
  }
});

for (let i = 0; i < firstMonthIndexes.length; i++) {
  allDays.unshift(firstMonthIndexes[i]);
  allDays.pop();
}

for (let i = 0; i < allDays.length; i++) {
  newArr.push(allDays[i]);
  if (newArr.length === 42) {
    totalArr.push([...newArr]);
    newArr = [];
  }
}

function calendarController(paramsIndex) {
  calendarViewCleaner();
  calendarIndex = totalArr[paramsIndex];

  let TRCounter = calendarIndex.length / 7;

  for (let i = 0; i < TRCounter; i++) {
    let tr = document.createElement("tr");
    allTrs.push(tr);
  }

  calendarIndex.forEach((day, index) => {
    counter++;
    let td = document.createElement("td");
    td.className = "rounded";
    td.textContent = day;
    let trustedIndex = Math.floor(counter / 7);
    allTrs[trustedIndex].appendChild(td);
    calendarTable.appendChild(allTrs[trustedIndex]);
  });
}

function createCalendarController() {
  calendarController(initialIndex);
}

function previousMonthController() {
  initialIndex -= 1;

  if (initialIndex < 0) initialIndex = 7;

  calendarController(initialIndex);
}

function nextMonthController() {
  initialIndex += 1;

  if (initialIndex === 7) initialIndex = 0;

  calendarController(initialIndex);
}

function calendarViewCleaner() {
  while (calendarTable.firstElementChild !== null) {
    calendarTable.removeChild(calendarTable.firstElementChild);
  }
}
