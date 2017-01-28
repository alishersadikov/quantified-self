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
  appendExercisesToTable()
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
  $('#exercise-table-body').slice(0).empty()
  JSON.parse(localStorage.getItem('exercises')).forEach(function(exercise, index){
    appendExerciseToTable(exercise, index)
  });
}

function appendExerciseToTable(exercise, index){
  var row = "<tr id='" + index +"'><td contenteditable='true' class='enclosed-cells exercise-cell'>" + exercise.name + "</td><td contenteditable='true' class='enclosed-cells calorie-cell'>" + exercise.calories + "</td><td><button class='delete-button'><span class=' glyphicon glyphicon-remove'></span></button></td></tr>"
  $('#exercise-table-body').prepend(row)

}

$('tbody').on('blur', ".exercise-cell", function(){
  var updatedName = this.textContent
  var index = this.parentElement.id

  exerciseNameUpdater(updatedName, index)
});

function exerciseNameUpdater(newName, index) {
  var exercises = JSON.parse(localStorage.getItem("exercises"))
  exercises[index].name = newName
  localStorage.setItem('exercises', JSON.stringify(exercises))
}

$('tbody').on('blur', ".calorie-cell", function(){
  var updatedCalorie = this.textContent
  var index = this.parentElement.id

  exerciseCalorieUpdater(updatedCalorie, index)
});

function exerciseCalorieUpdater(newCalorie, index) {
  var exercises = JSON.parse(localStorage.getItem("exercises"))
  exercises[index].calories = newCalorie
  localStorage.setItem('exercises', JSON.stringify(exercises))
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
  appendExercisesToTable()
});


appendExercisesToTable()
