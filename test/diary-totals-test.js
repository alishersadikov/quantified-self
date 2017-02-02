var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

require('locus')



test.describe('Totals Table', function() {
  var driver;
  this.timeout(10000000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  })

  test.afterEach(function() {
    driver.quit();
  })




  test.it('displays 2000 as the goal for the first ro', function() {

    // CREATE FOODS

    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('food 1');
    calories.sendKeys('100');
    submitButton.click();

    name.sendKeys('food 2');
    calories.sendKeys('200');
    submitButton.click();


    // CREATE EXERCISES

    driver.get('http://localhost:8080/exercises.html');
    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('exercise 1');
    calories.sendKeys('100');
    submitButton.click();

    name.sendKeys('exercise 2');
    calories.sendKeys('200');
    submitButton.click();

    // Add foods to breakfast lunch and dinner and snacks

      // Select foods and add them to table
      driver.get('http://localhost:8080/index.html');


    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-breakfast.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-lunch.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-dinner.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-snacks.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var exerciseOneCheckbox = driver.findElement({css: "tbody#exercise-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var exerciseTwoCheckbox = driver.findElement({css: "tbody#exercise-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    exerciseOneCheckbox.click();
    exerciseTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-exercise.btn-info.btn-sm"});
    addToBreakFastButton.click();

    driver.findElement({css: "#breakfast-tbody > tr:nth-child(2) > td:nth-child(3)"}).click()

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'totals-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "Goal Calories");
      assert.include(textValue, "2000");
    });
  });

  test.it('displays 1200 as the goal for calories consumed', function() {

    // CREATE FOODS

    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('food 1');
    calories.sendKeys('100');
    submitButton.click();

    name.sendKeys('food 2');
    calories.sendKeys('200');
    submitButton.click();


    // CREATE EXERCISES

    driver.get('http://localhost:8080/exercises.html');
    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('exercise 1');
    calories.sendKeys('100');
    submitButton.click();

    name.sendKeys('exercise 2');
    calories.sendKeys('200');
    submitButton.click();

    // Add foods to breakfast lunch and dinner and snacks

      // Select foods and add them to table
      driver.get('http://localhost:8080/index.html');


    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-breakfast.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-lunch.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-dinner.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-snacks.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var exerciseOneCheckbox = driver.findElement({css: "tbody#exercise-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var exerciseTwoCheckbox = driver.findElement({css: "tbody#exercise-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    exerciseOneCheckbox.click();
    exerciseTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-exercise.btn-info.btn-sm"});
    addToBreakFastButton.click();

    driver.findElement({css: "#breakfast-tbody > tr:nth-child(2) > td:nth-child(3)"}).click()

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'totals-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "Calories Consumed");
      assert.include(textValue, "1000");
    });
  });

  test.it('displays 300 as calories burned', function() {

    // CREATE FOODS

    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('food 1');
    calories.sendKeys('100');
    submitButton.click();

    name.sendKeys('food 2');
    calories.sendKeys('200');
    submitButton.click();


    // CREATE EXERCISES

    driver.get('http://localhost:8080/exercises.html');
    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('exercise 1');
    calories.sendKeys('100');
    submitButton.click();

    name.sendKeys('exercise 2');
    calories.sendKeys('200');
    submitButton.click();

    // Add foods to breakfast lunch and dinner and snacks

      // Select foods and add them to table
      driver.get('http://localhost:8080/index.html');


    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-breakfast.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-lunch.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-dinner.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-snacks.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var exerciseOneCheckbox = driver.findElement({css: "tbody#exercise-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var exerciseTwoCheckbox = driver.findElement({css: "tbody#exercise-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    exerciseOneCheckbox.click();
    exerciseTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-exercise.btn-info.btn-sm"});
    addToBreakFastButton.click();

    driver.findElement({css: "#breakfast-tbody > tr:nth-child(2) > td:nth-child(3)"}).click()

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'totals-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "Calories Burned");
      assert.include(textValue, "300");
    });
  });

  test.it('displays 1300 for remaining calories', function() {

    // CREATE FOODS

    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('food 1');
    calories.sendKeys('100');
    submitButton.click();

    name.sendKeys('food 2');
    calories.sendKeys('200');
    submitButton.click();


    // CREATE EXERCISES

    driver.get('http://localhost:8080/exercises.html');
    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('exercise 1');
    calories.sendKeys('100');
    submitButton.click();

    name.sendKeys('exercise 2');
    calories.sendKeys('200');
    submitButton.click();

    // Add foods to breakfast lunch and dinner and snacks

      // Select foods and add them to table
      driver.get('http://localhost:8080/index.html');


    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-breakfast.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-lunch.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-dinner.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-snacks.btn-info.btn-sm"});
    addToBreakFastButton.click();

    var exerciseOneCheckbox = driver.findElement({css: "tbody#exercise-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var exerciseTwoCheckbox = driver.findElement({css: "tbody#exercise-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    exerciseOneCheckbox.click();
    exerciseTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-exercise.btn-info.btn-sm"});
    addToBreakFastButton.click();

    driver.findElement({css: "#breakfast-tbody > tr:nth-child(2) > td:nth-child(3)"}).click()

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'totals-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "Remaining Calories");
      assert.include(textValue, "1300");
    });
  });
});
