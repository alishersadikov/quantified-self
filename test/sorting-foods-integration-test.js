var assert    = require('chai').assert;
// import { assert } from 'chai'
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('sorting foods', function() {
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

  test.it('clicking the first time sorts in ascending order', function() {

    // CREATE FOODS

    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys("food2");
    calories.sendKeys("222");
    submitButton.click();

    name.sendKeys("food1");
    calories.sendKeys("111");
    submitButton.click();

    name.sendKeys("food3");
    calories.sendKeys("333");
    submitButton.click();

    driver.get('http://localhost:8080');
    driver.sleep(1000)

    // clicking calories the first time sorts in ascending order

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
  });

  test.it('clicking the second time sorts in descending order', function() {

    // CREATE FOODS

    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys("food2");
    calories.sendKeys("222");
    submitButton.click();

    name.sendKeys("food1");
    calories.sendKeys("111");
    submitButton.click();

    name.sendKeys("food3");
    calories.sendKeys("333");
    submitButton.click();

    driver.get('http://localhost:8080');
    driver.sleep(1000)

    var foodCalories = driver.findElement({css: "#food-table > thead > tr > th:nth-child(3)"});
    foodCalories.click();
    driver.sleep(1000);
    foodCalories.click();

    driver.findElement({css: '#food-table-body tr:nth-child(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "food3");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(1) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "333");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(2) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "food2");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(2) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "222");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(3) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "food1");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(3) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "111");
    });
  });

  test.it('clicking the third time sorts in the original order', function() {

    // CREATE FOODS

    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys("food2");
    calories.sendKeys("222");
    submitButton.click();

    name.sendKeys("food1");
    calories.sendKeys("111");
    submitButton.click();

    name.sendKeys("food3");
    calories.sendKeys("333");
    submitButton.click();

    driver.get('http://localhost:8080');
    driver.sleep(1000);

    var foodCalories = driver.findElement({css: "#food-table > thead > tr > th:nth-child(3)"});
    foodCalories.click();
    driver.sleep(1000);
    foodCalories.click();
    driver.sleep(1000);
    foodCalories.click();

    driver.findElement({css: '#food-table-body tr:nth-child(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "food3");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(1) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "333");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(2) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "food1");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(2) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "111");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(3) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "food2");
    });

    driver.findElement({css: '#food-table-body tr:nth-child(3) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "222");
    });
  });
});
