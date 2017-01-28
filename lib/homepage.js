var currentDate = new Date();

$(document).ready(function(){
  displayDate();
});

$("button.left-arrow").on('click', function(){
  displayDate(-1);
});

$("button.right-arrow").on('click', function(){
  displayDate(+1);
});

function displayDate(day=0) {
  $(".today").html(getFullDate(day));
}

function getFullDate(day=0) {
  var oneDay = 24 * 60 * 60 * 1000;
  if (day === -1) return currentDate = new Date(currentDate.getTime() - oneDay);
  if (day === +1) return currentDate = new Date(currentDate.getTime() + oneDay);

  return getCurrentMonth(currentDate) + " " + getDayWithSuffix(currentDate) + ", " + getCurrentYear(currentDate);
}

function getCurrentMonth(currentDate) {
  debugger;
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[currentDate.getMonth()];
}

function getDayWithSuffix(currentDate) {
  var rawDay = currentDate.getDate();
  var dateSuffixes = {"1":"st", "2":"nd", "3":"rd"};
  var suffix = "";

  if (dateSuffixes[rawDay]) {
    suffix = dateSuffixes[rawDay];
  } else {
    suffix = "th";
  }

  return rawDay + suffix;
}

function getCurrentYear(currentDate) {
  return currentDate.getYear() + 1900;
}
