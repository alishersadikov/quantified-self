var _ = require("lodash")


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
  $('#new-exercise-name').val("");
  $('#new-exercise-calories').val("");
  $('#new-name-div').html("<br>")
  $('#new-calorie-div').html("<br>")
  addExerciseToLocalStorage(exercise)
  appendExerciseToTable(exercise)
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
    appendExerciseToTable(exercise)
  });
}

function appendExerciseToTable(exercise){
  var row = "<tr><td class='enclosed-cells'>" + exercise.name + "</td><td class='enclosed-cells'>" + exercise.calories + "</td><td><button class='delete-button'><span class=' glyphicon glyphicon-remove'></span></button></td></tr>"
  $('#exercise-table-body').prepend(row)

}


$('#exercise-table-body').on('click', ".delete-button", function(){
  var exerciseToDelete = this.parentElement.parentElement.firstChild.textContent
  var exercisesJSON = localStorage.getItem("exercises")
  var exercises = JSON.parse(exercisesJSON)
  for( i = 0; i < exercises.length; i++){
    if(exercises[i].name === exerciseToDelete){
      delete exercises[i]
      exercises =  _.remove(exercises, undefined)
      localStorage.setItem('exercises', JSON.stringify(exercises))
    }
  }
  $('#exercise-table-body').slice(0).empty()

  appendExercisesToTable()
});


appendExercisesToTable()
