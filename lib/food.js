var _ = require("lodash")

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
