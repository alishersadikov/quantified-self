$(document).ready(function(){
  displayTodaysDate();
});

function displayTodaysDate() {
  var today = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  var currentMonth = months[today.getMonth()];
  var rawDate = today.getDate();
  var year = today.getYear() + 1900;

  var dateSuffixes = {"1":"st", "2":"nd", "3":"rd"};
  var suffix = "";
  if (dateSuffixes[rawDate]) {
    suffix = dateSuffixes[rawDate];
  } else {
    suffix = "th";
  }

  var fullDate = currentMonth + " " + rawDate + suffix + ", " + year;
  $(".today").html(fullDate);
}
