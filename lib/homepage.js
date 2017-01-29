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
function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

module.exports = Food;

var foodNameInput = document.getElementById('new-food-name'),
    foodCalorieInput = document.getElementById('new-food-calories'),
    foodSubmitButton = document.getElementById('new-submit');

function appendNameWarning() {
  var warningElement = document.getElementById('new-name-div');
  warningElement.innerHTML = "";
  var warningText = document.createTextNode("Please enter a food name");
  warningElement.appendChild(warningText);
}

function appendCalorieWarning() {
  var warningElement = document.getElementById('new-calorie-div');
  warningElement.innerHTML = "";
  var warningText = document.createTextNode("Please enter a calorie amount");
  warningElement.appendChild(warningText);
}

foodSubmitButton.addEventListener('click', function(){
  var name = foodNameInput.value, calories = foodCalorieInput.value
  if (name.trim() === "") return appendNameWarning();
  if (calories.trim() === "") return appendCalorieWarning();
  var food = new Food(name, calories);
  document.getElementById('new-food-name').value = "";
  document.getElementById('new-food-calories').value = "";
  document.getElementById('new-name-div').innerHTML = '&nbsp';
  document.getElementById('new-calorie-div').innerHTML = '&nbsp';
  addFoodToLocalStorage(food)
  appendFoodsToTable()
});

function addFoodToLocalStorage(food) {
  var storedFoodsJson = localStorage.getItem("foods");
  if (storedFoodsJson === null) storedFoodsJson = '[]';
  var currentFood = JSON.parse(storedFoodsJson)
  currentFood.push(food)
  storedFoodsJson = JSON.stringify(currentFood)
  localStorage.setItem('foods', storedFoodsJson)
}

function appendFoodsToTable(){
    $('#food-table-body').slice(0).empty()
  JSON.parse(localStorage.getItem('foods')).forEach(function(food, index){
    appendFoodToTable(food, index)
  });
}

function appendFoodToTable(food, index){
  var row = "<tr id='" + index +"'><td contenteditable='true' class='enclosed-cells food-cell'>" + food.name + "</td><td contenteditable='true' class='enclosed-cells calorie-cell'>" + food.calories + "</td><td><button class='delete-button'><span class=' glyphicon glyphicon-remove'></span></button></td></tr>"
  $('#food-table-body').prepend(row)
}

$('tbody').on('blur', ".food-cell", function(){
  var updatedName = this.textContent, index = this.parentElement.id;
  foodNameUpdater(updatedName, index)
});

$('tbody').on('keydown', ".food-cell", function(event){
  if (event.keyCode == 13) {
    event.preventDefault();
    var updatedCalorie = this.textContent, index = this.parentElement.id;
    foodNameUpdater(updatedCalorie, index)
    $(this).blur();
  }
});

$('tbody').on('blur', ".calorie-cell", function(){
  var updatedName = this.textContent, index = this.parentElement.id;
  foodCalorieUpdater(updatedName, index)
});

$('tbody').on('keydown', ".calorie-cell", function(event){
  if (event.keyCode == 13) {
    event.preventDefault();
    var updatedCalorie = this.textContent, index = this.parentElement.id;
    foodCalorieUpdater(updatedCalorie, index)
    $(this).blur();
  }
});

function foodNameUpdater(newName, index) {
  var foods = JSON.parse(localStorage.getItem("foods"))
  foods[index].name = newName;
  localStorage.setItem('foods', JSON.stringify(foods))
}

function foodCalorieUpdater(newCalorie, index) {
  var foods = JSON.parse(localStorage.getItem("foods"))
  foods[index].calories = newCalorie;
  localStorage.setItem('foods', JSON.stringify(foods))
}

$('#food-table-body').on('click', ".delete-button", function(){
  var foodToDelete = this.parentElement.parentElement.firstChild.textContent,
      foodsJSON = localStorage.getItem("foods"),
      foods = JSON.parse(foodsJSON);

  for( i = 0; i < foods.length; i++){
    if(foods[i].name === foodToDelete){
      delete foods[i];
      foods =  _.remove(foods, undefined);
      localStorage.setItem('foods', JSON.stringify(foods));
    }
  }
  appendFoodsToTable()
});

$("#filter-by-name").on("keyup", function(){
  var input = document.getElementById("filter-by-name"),
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

module.exports = Exercise;

var nameInput = document.getElementById('new-exercise-name'),
    calorieInput = document.getElementById('new-exercise-calories'),
    submitButton = document.getElementById('new-submit');

function appendExerciseNameWarning() {
  $('#new-name-div').text("Please enter a exercise name");
}

function appendExerciseCalorieWarning() {
  $('#new-calorie-div').text("Please enter a calories amount");
}

$("#new-submit").on('click', function(){
  var name = nameInput.value, calories = calorieInput.value;
  if (name.trim() === "") return appendExerciseNameWarning();
  if (calories.trim() === "") return appendExerciseCalorieWarning();
  var exercise = new Exercise(name, calories);
  $('#new-exercise-name').val("");
  $('#new-exercise-calories').val("");
  $('#new-name-div').html("<br>");
  $('#new-calorie-div').html("<br>");
  addExerciseToLocalStorage(exercise);
  appendExercisesToTable();
});

function addExerciseToLocalStorage(exercise) {
  var storedExercisesJson = localStorage.getItem("exercises");
  if (storedExercisesJson === null) storedExercisesJson = '[]';
  var currentExercise = JSON.parse(storedExercisesJson);
  currentExercise.push(exercise);
  storedExercisesJson = JSON.stringify(currentExercise);
  localStorage.setItem('exercises', storedExercisesJson);
}

function appendExercisesToTable(){
  $('#exercise-table-body').slice(0).empty()
  JSON.parse(localStorage.getItem('exercises')).forEach(function(exercise, index){
    appendExerciseToTable(exercise, index);
  });
}

function appendExerciseToTable(exercise, index){
  var row = "<tr id='" + index +"'><td contenteditable='true' class='enclosed-cells exercise-cell'>" + exercise.name + "</td><td contenteditable='true' class='enclosed-cells calorie-cell'>" + exercise.calories + "</td><td><button class='delete-button'><span class=' glyphicon glyphicon-remove'></span></button></td></tr>"
  $('#exercise-table-body').prepend(row);
}

$('tbody').on('blur', ".exercise-cell", function(){
  var updatedName = this.textContent, index = this.parentElement.id;
  exerciseNameUpdater(updatedName, index);
});

$('tbody').on('keydown', ".exercise-cell", function(event){
  if (event.keyCode == 13) {
    event.preventDefault();
    var updatedName = this.textContent, index = this.parentElement.id;
    exerciseNameUpdater(updatedName, index);
    $(this).blur();
  }
});

$('tbody').on('blur', ".calorie-cell", function(){
  var updatedCalorie = this.textContent, index = this.parentElement.id;
  exerciseCalorieUpdater(updatedCalorie, index);
});

$('tbody').on('keydown', ".calorie-cell", function(event){
  if (event.keyCode == 13) {
    event.preventDefault();
    var updatedCalorie = this.textContent, index = this.parentElement.id;
    exerciseCalorieUpdater(updatedCalorie, index);
    $(this).blur();
  }
});

function exerciseNameUpdater(newName, index) {
  var exercises = JSON.parse(localStorage.getItem("exercises"));
  exercises[index].name = newName;
  localStorage.setItem('exercises', JSON.stringify(exercises));
}

function exerciseCalorieUpdater(newCalorie, index) {
  var exercises = JSON.parse(localStorage.getItem("exercises"));
  exercises[index].calories = newCalorie;
  localStorage.setItem('exercises', JSON.stringify(exercises));
}

$('#exercise-table-body').on('click', ".delete-button", function(){
  var exerciseToDelete = this.parentElement.parentElement.firstChild.textContent;
  var exercisesJSON = localStorage.getItem("exercises");
  var exercises = JSON.parse(exercisesJSON);
  for( i = 0; i < exercises.length; i++){
    if(exercises[i].name === exerciseToDelete){
      delete exercises[i];
      exercises =  _.remove(exercises, undefined);
      localStorage.setItem('exercises', JSON.stringify(exercises));
    }
  }
  appendExercisesToTable();
});

$("#filter-by-name").on("keyup", function(){
  var input = document.getElementById("filter-by-name");
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
