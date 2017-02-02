var assert    = require('chai').assert;
// import { assert } from 'chai'
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('diary add, delete and persist', function() {
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  })

  test.afterEach(function() {
    driver.quit();
  })

  test.it('add food / delete to breakfast changes persist in diary', function() {

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

    driver.findElement({id: 'breakfast-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "food 1");
      assert.include(textValue, "food 2");
      assert.include(textValue, "100");
      assert.include(textValue, "200");
    });
      driver.sleep(100)

    driver.findElement({css: "#breakfast-tbody > tr:nth-child(2) > td:nth-child(3)"}).click()

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'breakfast-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "food 1");
      assert.notInclude(textValue, "food 2");
      assert.include(textValue, "100");
      assert.notInclude(textValue, "200");
    });
  });

  test.it('add food / delete to lunch changes persist in diary', function() {

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

    // Add foods to lunch lunch and dinner and snacks

      // Select foods and add them to table
      driver.get('http://localhost:8080/index.html');


    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-lunch.btn-info.btn-sm"});
    addToBreakFastButton.click();
    driver.sleep(100)
    // debugger;

    driver.findElement({id: 'lunch-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "food 1");
      assert.include(textValue, "food 2");
      assert.include(textValue, "100");
      assert.include(textValue, "200");
    });
      driver.sleep(100)

    driver.findElement({css: "#lunch-tbody > tr:nth-child(2) > td:nth-child(3)"}).click()

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'lunch-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "food 1");
      assert.notInclude(textValue, "food 2");
      assert.include(textValue, "100");
      assert.notInclude(textValue, "200");
    });
  });

  test.it('add food / delete to dinner changes persist in diary', function() {

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

    // Add foods to dinner dinner and dinner and snacks

      // Select foods and add them to table
      driver.get('http://localhost:8080/index.html');


    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-dinner.btn-info.btn-sm"});
    addToBreakFastButton.click();
    driver.sleep(100)
    // debugger;

    driver.findElement({id: 'dinner-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "food 1");
      assert.include(textValue, "food 2");
      assert.include(textValue, "100");
      assert.include(textValue, "200");
    });
      driver.sleep(100)

    driver.findElement({css: "#dinner-tbody > tr:nth-child(2) > td:nth-child(3)"}).click()

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'dinner-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "food 1");
      assert.notInclude(textValue, "food 2");
      assert.include(textValue, "100");
      assert.notInclude(textValue, "200");
    });
  });

  test.it('add food / delete to snacks changes persist in diary', function() {

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

    // Add foods to snacks snacks and snacks and snacks

      // Select foods and add them to table
      driver.get('http://localhost:8080/index.html');


    var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    foodOneCheckbox.click();
    foodTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-snacks.btn-info.btn-sm"});
    addToBreakFastButton.click();
    driver.sleep(100)

    driver.findElement({id: 'snacks-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "food 1");
      assert.include(textValue, "food 2");
      assert.include(textValue, "100");
      assert.include(textValue, "200");
    });
      driver.sleep(100)

    driver.findElement({css: "#snacks-tbody > tr:nth-child(2) > td:nth-child(3)"}).click()

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'snacks-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "food 1");
      assert.notInclude(textValue, "food 2");
      assert.include(textValue, "100");
      assert.notInclude(textValue, "200");
    });
  });
  test.it('add exercise / delete to snacks changes persist in diary', function() {

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

      // Select exercises and add them to table
      driver.get('http://localhost:8080/index.html');


    var exerciseOneCheckbox = driver.findElement({css: "tbody#exercise-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    var exerciseTwoCheckbox = driver.findElement({css: "tbody#exercise-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    exerciseOneCheckbox.click();
    exerciseTwoCheckbox.click();

    var addToBreakFastButton = driver.findElement({css: "button#add-to-exercise.btn-info.btn-sm"});
    addToBreakFastButton.click();
    driver.sleep(100)
    // debugger;

    driver.findElement({id: 'exercise-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "exercise 1");
      assert.include(textValue, "exercise 2");
      assert.include(textValue, "100");
      assert.include(textValue, "200");
    });
      driver.sleep(100)

    driver.findElement({css: "#exercise-tbody > tr:nth-child(2) > td:nth-child(3)"}).click()

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'exercise-tbody'}).getText().then(function(textValue) {
      assert.include(textValue, "exercise 1");
      assert.notInclude(textValue, "exercise 2");
      assert.include(textValue, "100");
      assert.notInclude(textValue, "200");
    });
  });
});
