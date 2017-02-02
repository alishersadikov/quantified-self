var assert    = require('chai').assert;
// import { assert } from 'chai'
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('sorting', function() {
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

  test.it('clicking food calories header sorts foods by calories', function() {

    // CREATE FOODS

    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});


    name.sendKeys("food1");
    calories.sendKeys("111");
    submitButton.click();

    name.sendKeys("food2");
    calories.sendKeys("222");
    submitButton.click();

    name.sendKeys("food3");
    calories.sendKeys("333");
    submitButton.click();


    driver.get('http://localhost:8080');
    driver.sleep(1000)

    var foodCalories = driver.findElement({css: "#food-table > thead > tr > th:nth-child(3)"});
    foodCalories.click();

    driver.findElement({css: '#food-table-body tr:nth-child(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "food1");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(1) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "111");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(2) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "food2");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(2) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "222");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(3) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "food3");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(3) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "333");
    });


    // CREATE EXERCISES
    //
    // driver.get('http://localhost:8080/exercises.html');
    // var name = driver.findElement({id: 'new-exercise-name'});
    // var calories = driver.findElement({id: 'new-exercise-calories'});
    // var submitButton = driver.findElement({id: 'new-submit'});
    //
    // name.sendKeys('exercise 1');
    // calories.sendKeys('100');
    // submitButton.click();
    //
    // name.sendKeys('exercise 2');
    // calories.sendKeys('200');
    // submitButton.click();
    //
    // // Add foods to breakfast lunch and dinner and snacks
    //
    // // Select foods and add them to table
    // driver.get('http://localhost:8080/index.html');
    //
    // var foodOneCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(1) td:nth-child(1) > input[type='checkbox']"});
    // var foodTwoCheckbox = driver.findElement({css: "tbody#food-table-body > tr:nth-child(2) td:nth-child(1) > input[type='checkbox']"});
    // foodOneCheckbox.click();
    // foodTwoCheckbox.click();
    //
    // var addToBreakFastButton = driver.findElement({css: "button#add-to-breakfast.btn-info.btn-sm"});
    // addToBreakFastButton.click();
    // driver.sleep(10000000)
    // // debugger;
    //
    // driver.findElement({id: 'breakfast-tbody'}).getText().then(function(textValue) {
    //   assert.include(textValue, "food 1");
    //   assert.include(textValue, "food 2");
    //   assert.include(textValue, "100");
    //   assert.include(textValue, "200");
    // });
  });
});
