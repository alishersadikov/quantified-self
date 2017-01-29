var _ = require("lodash")

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
