function Exercise(name, calories) {
  this.name = name;
  this.calories = calories;
}
module.exports = Exercise;

var nameInput = document.getElementById('new-exercise-name')
var calorieInput = document.getElementById('new-exercise-calories')
var submitButton = document.getElementById('new-submit')

function appendExerciseNameWarning() {
  $('#new-name-div').text("Please enter a exercise name")
}

function appendExerciseCalorieWarning() {
  $('#new-calorie-div').text("Please enter a calories amount")
}

$("#new-submit").on('click', function(){
  var name = nameInput.value, calories = calorieInput.value
  if (name.trim() === "") return appendExerciseNameWarning();
  if (calories.trim() === "") return appendExerciseCalorieWarning();
  var exercise = new Exercise(name, calories);
  $('#new-exercise-name').empty();
  $('#new-exercise-calories').empty();
  $('#new-name-div').html("<br>")
  $('#new-calorie-div').html("<br>")
  addExerciseToLocalStorage(exercise)
  addExerciseToTable(exercise)
});

function addExerciseToLocalStorage(exercise) {
  var storedExercisesJson = localStorage.getItem("exercises");
  if (storedExercisesJson === null) storedExercisesJson = '[]';

  var currentExercise = JSON.parse(storedExercisesJson)
  currentExercise.push(exercise)
  storedExercisesJson = JSON.stringify(currentExercise)
  localStorage.setItem('exercises', storedExercisesJson)
}

function appendExercisesToTable(){
  JSON.parse(localStorage.getItem('exercises')).forEach(function(exercise){
    addExerciseToTable(exercise)

  });
}

function addExerciseToTable(exercise){
  var row = "<tr><td class='enclosed-cells'>" + exercise.name + "</td><td class='enclosed-cells'>" + exercise.calories + "</td><td><button><span class=' glyphicon glyphicon-remove'></span></button></td></tr>"
  $('#exercise-table-body').append(row)
}

appendExercisesToTable()
