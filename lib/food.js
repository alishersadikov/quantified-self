var _ = require("lodash")

function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}
module.exports = Food;

var foodNameInput = document.getElementById('new-food-name')
var foodCalorieInput = document.getElementById('new-food-calories')
var foodSubmitButton = document.getElementById('new-submit')

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
  appendFoodToTable(food)
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
  JSON.parse(localStorage.getItem('foods')).forEach(function(food){
    appendFoodToTable(food)

  });
}

function appendFoodToTable(food){
  var row = "<tr><td class='enclosed-cells'>" + food.name + "</td><td class='enclosed-cells'>" + food.calories + "</td><td><button class='delete-button'><span class=' glyphicon glyphicon-remove'></span></button></td></tr>"
  $('#food-table-body').prepend(row)

}

$('#food-table-body').on('click', ".delete-button", function(){
  var foodToDelete = this.parentElement.parentElement.firstChild.textContent
  var foodsJSON = localStorage.getItem("foods")
  var foods = JSON.parse(foodsJSON)
  for( i = 0; i < foods.length; i++){
    if(foods[i].name === foodToDelete){
      delete foods[i]
      foods =  _.remove(foods, undefined)
      localStorage.setItem('foods', JSON.stringify(foods))
    }
  }
  $('#food-table-body').slice(1).empty()

  appendFoodsToTable()
});


appendFoodsToTable()