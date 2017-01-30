var _ = require("lodash")
var currentDate = new Date();


$(document).ready(function(){
  localStorage.setItem('pageDate', getFullDate())
  displayDate();
});

$("button.left-arrow").on('click', function(){
  storageSetup();
  localStorage.setItem('pageDate', getFullDate(-1))
  displayDate();
  displayDiaryTables();
});

$("button.right-arrow").on('click', function(){
  storageSetup();
  localStorage.setItem('pageDate', getFullDate(+1))
  displayDate();
  displayDiaryTables();
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
  var row = "<tr id='" + index + "'><td class='enclosed-cells'><input type='checkbox'></td><td contenteditable='true' class='enclosed-cells food-cell'>" + food.name + "</td><td contenteditable='true' class='enclosed-cells calorie-cell'>" + food.calories + "</td></tr>"
  $('#food-table-body').prepend(row);
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

$("#add-to-dinner").on('click', function(){
  var ids = getCheckedItems('food-table-body');
  appendFoodsToTable();
  var objects = idsToObjects(ids, "foods");
  objects.forEach(function(object){
    storageUpdater(object, "dinner")
  })
  displayDiaryTables();
  $(this).blur();
});

$('#dinner-tbody').on('click', ".delete-button", function(){
  var idToDelete = this.parentElement.parentElement.id;
  var table = "dinner";
  removeFromLocalStorage(idToDelete, table);
  displayDiaryTables();
});

$("#add-to-snacks").on('click', function(){
  var ids = getCheckedItems('food-table-body');
  appendFoodsToTable();
  var objects = idsToObjects(ids, "foods");
  objects.forEach(function(object){
    storageUpdater(object, "snacks")
  })
  displayDiaryTables();
  $(this).blur();
});

$('#snacks-tbody').on('click', ".delete-button", function(){
  var idToDelete = this.parentElement.parentElement.id;
  var table = "snacks";
  removeFromLocalStorage(idToDelete, table);
  displayDiaryTables();
});

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

$("#add-to-exercise").on('click', function(){
  var ids = getCheckedItems('exercise-table-body');
  appendExercisesToTable();
  var objects = idsToObjects(ids, "exercises")
  objects.forEach(function(object){
    storageUpdater(object, "exercise")
  })
  displayDiaryTables();
  $(this).blur();
});

$('#exercise-tbody').on('click', ".delete-button", function(){
  var idToDelete = this.parentElement.parentElement.id;
  var table = "exercise";
  removeFromLocalStorage(idToDelete, table);
  displayDiaryTables();
});

function removeFromLocalStorage(id, table) {
  var storage = storageBreakdown();
  for(var i = 0; i < storage[table].length; i++){
    if(i == id){
      delete storage[table][i];
      storage[table] =  _.remove(storage[table], undefined);
      localStorage.setItem(getPageDate(), JSON.stringify(storage));
    }
  }
}

function displayDiaryTable(table, target) {
  var tbody = "#" + table + "-tbody";
  $(tbody).slice(0).empty()
  storageBreakdown()[table].forEach(function(item, index){
    var row = "<tr id='" + index +"'></td><td contenteditable='true' class='enclosed-cells food-cell'>" + item.name + "</td><td contenteditable='true' class='enclosed-cells calorie-cell'>" + item.calories + "</td><td><button class='delete-button'><span class='glyphicon glyphicon-remove'></span></button></td></tr>";
    $(tbody).prepend(row);
  });
  calculateAndAppendTotal(tbody);
  calculateAndAppendRemainingCalories(tbody, target);
}

function displayDiaryTables() {
  var tables = ["breakfast", "lunch", "dinner", "snacks", "exercise"];
  var targets = [400, 600, 800, 200, 0];

  tables.forEach(function(table, index){
    displayDiaryTable(table, targets[index]);
  })
  calculateAndAppendGoalCalories();
  calculateAndAppendCaloriesConsumed();
  calculateAndAppendCaloriesBurned();
  calculateAndAppendTotalRemainingCalories();
}
function storageUpdater(object, table){
  var tables = storageBreakdown();
  tables[table].push(object);
  localStorage.setItem(getPageDate(), JSON.stringify(tables))
}

function getCheckedItems(table) {
  var tableBody = document.getElementById(table);
  var ids = [];
  var children = tableBody.children;
  for (var i = 0; i < children.length; i++) {
    var status = children[i].firstChild.firstChild.checked;
    if(status) ids.push(children[i].id);
  }
  return ids;
}

function idsToObjects(ids, type){
  var objects = JSON.parse(localStorage.getItem(type));
  var selected = [];
  ids.forEach(function(id){
    selected.push(objects[id])
  })
  return selected;
}

function storageSetup(){
  if (localStorage.getItem(getPageDate()) == undefined) {
    var date =  getPageDate()
    var emptyTables = {breakfast:[], lunch:[], dinner:[], snacks:[], exercise:[]}
     localStorage.setItem(date, JSON.stringify(emptyTables) )
  } else {
     localStorage.getItem(getPageDate())
  }
}

function storageBreakdown(){
  var storageString = localStorage.getItem(getPageDate())
  return JSON.parse(storageString)
}

function getPageDate(){
  return localStorage.getItem('pageDate')
}

storageSetup()
displayDiaryTables()
// ///////////////////////////////////////////////////////////////////////////
// food implementation
// ///////////////////////////////////////////////////////////////////////////
$("#add-to-breakfast").on('click', function(){
  var ids = getCheckedItems('food-table-body');
  appendFoodsToTable();
  var objects = idsToObjects(ids, "foods")
  objects.forEach(function(object){
    storageUpdater(object, "breakfast")
  })
  displayDiaryTables();
  $(this).blur();
})

$('#breakfast-tbody').on('click', ".delete-button", function(){
  var idToDelete = this.parentElement.parentElement.id;
  var table = "breakfast";
  removeFromLocalStorage(idToDelete, table);
  displayDiaryTables();
});

$("#add-to-lunch").on('click', function(){
  var ids = getCheckedItems('food-table-body');
  appendFoodsToTable();
  var objects = idsToObjects(ids, "foods")
  objects.forEach(function(object){
    storageUpdater(object, "lunch")
  })
  displayDiaryTables();
  $(this).blur();
})

$('#lunch-tbody').on('click', ".delete-button", function(){
  var idToDelete = this.parentElement.parentElement.id;
  var table = "lunch";
  removeFromLocalStorage(idToDelete, table);
  displayDiaryTables();
});

function calculateAndAppendTotal(tbody){
  var total = 0;
  $(tbody + " tr .calorie-cell").each(function(){
    total += parseInt(this.innerHTML);
  })
  var row = greenOrBlack("Total Calories", total, tbody)
  $(tbody).append(row);
}

function greenOrBlack(descriptiveText, total, tbody) {
  if (total > 0 && (tbody == "#exercise-tbody" || tbody == "#totals-tbody")) {
    return "<tr></td><td class='enclosed-cells'><strong>" + descriptiveText + "</strong></td><td class='enclosed-cells green-text total-cell'>" + total + "</td><td></td></tr>";
  } else {
    return "<tr></td><td class='enclosed-cells'><strong>" + descriptiveText + "</strong></td><td class='enclosed-cells total-cell'>" + total + "</td><td></td></tr>";
  }
}

function calculateAndAppendRemainingCalories(tbody, target) {
  if (target === 0) return;
  var remaining = target - $(tbody + " > tr:last-child > td:nth-child(2)").text();
  var row = redOrGreen(remaining)
  $(tbody).append(row);
}

function redOrGreen(remaining) {
  if (remaining >= 0) {
    return "<tr></td><td class='enclosed-cells remaining-cell'><strong>Remaining Calories</strong></td><td class='enclosed-cells green-text remaining-cell'>" + remaining + "</td><td></td></tr>";
  } else {
    return "<tr></td><td class='enclosed-cells remaining-cell'><strong>Remaining Calories</strong></td><td class='enclosed-cells red-text remaining-cell'>" + remaining + "</td><td></td></tr>";
  }
}

function calculateAndAppendGoalCalories(){
  var goal = 2000;
  $("#totals-tbody").slice(0).empty();
  var row = "<tr></td><td class='enclosed-cells'><strong>Goal Calories</strong></td><td class='enclosed-cells total-cell'>" + goal + "</td><td></td></tr>";
  $("#totals-tbody").append(row);
}

function calculateAndAppendCaloriesConsumed(){
  var total = 0;
  $(".enclosed-cells.total-cell").each(function(){
    tbody = this.parentElement.parentElement.id;
    if (tbody !== "totals-tbody" && tbody !== "exercise-tbody") total += parseInt(this.innerHTML);
  })

  var row = "<tr></td><td class='enclosed-cells'><strong>Calories Consumed</strong></td><td class='enclosed-cells total-cell'>" + total + "</td><td></td></tr>";
  $("#totals-tbody").append(row);
}

function calculateAndAppendCaloriesBurned(){
  var total = $("#exercise-tbody > tr:last-child > td.enclosed-cells.total-cell").text();

  var row = greenOrBlack("Calories Burned", total, "#totals-tbody");

  $("#totals-tbody").append(row);
}

function calculateAndAppendTotalRemainingCalories() {
  var goalCalories = $("#totals-tbody tr:first-child .total-cell").text();
  var caloriesConsumed = $("#totals-tbody tr:nth-child(2) .total-cell").text();
  var caloriesBurned = $("#totals-tbody tr:nth-child(3) .total-cell").text();
  var total = parseInt(goalCalories) - parseInt(caloriesConsumed) + parseInt(caloriesBurned);

  var row = "<tr></td><td class='enclosed-cells'><strong>Remaining Calories</strong></td><td class='enclosed-cells total-cell'>" + total + "</td><td></td></tr>";
  $("#totals-tbody").append(row);
}
