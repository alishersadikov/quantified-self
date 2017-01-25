function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

module.exports = Food;

var foodNameInput = document.getElementById('new-food-name')
var foodCalorieInput = document.getElementById('new-food-calories')
var foodSubmitButton = document.getElementById('new-food-submit')

foodSubmitButton.addEventListener('click', function(){
  var name = foodNameInput.value
  var calories = foodCalorieInput.value
  var food = new Food(name, calories);
  addFoodToLocalStorage(food)
  appendFoodToTable(food)
});

function addFoodToLocalStorage(food) {
  var storedFoodsJson = localStorage.getItem("foods");
  if (storedFoodsJson === null) {
    storedFoodsJson = '[]'
  }
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
  var tableBody = document.getElementById('food-table-body')
  var row = document.createElement('tr')
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
  tableBody.appendChild(row)
}

appendFoodsToTable()
