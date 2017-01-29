var currentDate = new Date();
var _ = require("lodash")


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
  if (day === -1) currentDate = new Date(currentDate.getTime() - oneDay);
  if (day === +1) currentDate = new Date(currentDate.getTime() + oneDay);

  return formatCurrentMonth(currentDate) + " " +
         formatCurrentDay(currentDate) + ", " +
         formatCurrentYear(currentDate);
}

function formatCurrentMonth(currentDate) {
  var months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

  return months[currentDate.getMonth()];
}

function formatCurrentDay(currentDate) {
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

function formatCurrentYear(currentDate) {
  return currentDate.getYear() + 1900;
}
///////////////////////////////////////////////////////////////////////////////
//// FOODS.jS CODE
///////////////////////////////////////////////////////////////////////////////

function appendFoodsToTable(){
    $('#food-table-body').slice(0).empty()
  JSON.parse(localStorage.getItem('foods')).forEach(function(food, index){
    appendFoodToTable(food, index)
  });
}

function appendFoodToTable(food, index){
  var row = "<tr id='" + index +"'><td class='enclosed-cells'><input type='checkbox'></td><td contenteditable='true' class='enclosed-cells food-cell'>" + food.name + "</td><td contenteditable='true' class='enclosed-cells calorie-cell'>" + food.calories + "</td></tr>"
  $('#food-table-body').prepend(row)
}

$("#filter-food-by-name").on("keyup", function(){
  var input = document.getElementById("filter-food-by-name"),
      filter = input.value.toUpperCase(),
      table = document.getElementById("food-table"),
      tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
})

appendFoodsToTable()

///////////////////////////////////////////////////////////////////////////////
//// exercise.jS CODE
///////////////////////////////////////////////////////////////////////////////


function Exercise(name, calories) {
  this.name = name;
  this.calories = calories;
}


function appendExercisesToTable(){
  $('#exercise-table-body').slice(0).empty()
  JSON.parse(localStorage.getItem('exercises')).forEach(function(exercise, index){
    appendExerciseToTable(exercise, index);
  });
}

function appendExerciseToTable(exercise, index){
  var row = "<tr id='" + index + "'><td class='enclosed-cells'><input type='checkbox'></td><td contenteditable='true' class='enclosed-cells exercise-cell'>" + exercise.name + "</td><td contenteditable='true' class='enclosed-cells calorie-cell'>" + exercise.calories + "</td></tr>"
  $('#exercise-table-body').prepend(row);
}

$("#filter-exercise-by-name").on("keyup", function(){
  var input = document.getElementById("filter-exercise-by-name");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("exercise-table");
  var tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
})

appendExercisesToTable()
