function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}
module.exports = Food;

var foodNameInput = document.getElementById('new-food-name')
var foodCalorieInput = document.getElementById('new-food-calories')
var foodSubmitButton = document.getElementById('new-food-submit')

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
  var row = document.getElementById('food-table').insertRow(1)
  var tableBody = document.getElementById('food-table-body')
  // var row = document.createElement('tr')
  var nameCell = document.createElement('td')
  var nameText = document.createTextNode(food.name)
  var caloriesCell = document.createElement('td')
  var caloriesText = document.createTextNode(food.calories)
  var deleteCell = document.createElement('td')
  var deleteSpan = document.createElement('span')
  var deleteButton = document.createElement("button")
  deleteSpan.className = "glyphicon glyphicon-remove"
  nameCell.className = "enclosed-cells"
  caloriesCell.className = "enclosed-cells"
  nameCell.appendChild(nameText)
  caloriesCell.appendChild(caloriesText)
  deleteButton.appendChild(deleteSpan)
  deleteCell.appendChild(deleteButton)
  row.appendChild(nameCell)
  row.appendChild(caloriesCell)
  row.appendChild(deleteCell)
}

appendFoodsToTable()
