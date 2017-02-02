var assert    = require('chai').assert;
// import { assert } from 'chai'
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('sorting exercises', function() {
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

    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys("exercise2");
    calories.sendKeys("222");
    submitButton.click();

    name.sendKeys("exercise1");
    calories.sendKeys("111");
    submitButton.click();

    name.sendKeys("exercise3");
    calories.sendKeys("333");
    submitButton.click();

    driver.get('http://localhost:8080');
    driver.sleep(1000)

    // clicking calories the first time sorts in ascending order

    var exerciseCalories = driver.findElement({css: "#exercise-table > thead > tr > th:nth-child(3)"});
    exerciseCalories.click();

    driver.findElement({css: '#exercise-table-body tr:nth-child(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "exercise1");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(1) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "111");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(2) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "exercise2");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(2) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "222");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(3) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "exercise3");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(3) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "333");
    });
  });

  test.it('clicking the second time sorts in descending order', function() {

    // CREATE FOODS

    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys("exercise2");
    calories.sendKeys("222");
    submitButton.click();

    name.sendKeys("exercise1");
    calories.sendKeys("111");
    submitButton.click();

    name.sendKeys("exercise3");
    calories.sendKeys("333");
    submitButton.click();

    driver.get('http://localhost:8080');
    driver.sleep(1000)

    var exerciseCalories = driver.findElement({css: "#exercise-table > thead > tr > th:nth-child(3)"});
    exerciseCalories.click();
    driver.sleep(1000);
    exerciseCalories.click();

    driver.findElement({css: '#exercise-table-body tr:nth-child(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "exercise3");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(1) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "333");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(2) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "exercise2");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(2) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "222");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(3) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "exercise1");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(3) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "111");
    });
  });

  test.it('clicking the third time sorts in the original order', function() {

    // CREATE FOODS

    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys("exercise2");
    calories.sendKeys("222");
    submitButton.click();

    name.sendKeys("exercise1");
    calories.sendKeys("111");
    submitButton.click();

    name.sendKeys("exercise3");
    calories.sendKeys("333");
    submitButton.click();

    driver.get('http://localhost:8080');
    driver.sleep(1000);

    var exerciseCalories = driver.findElement({css: "#exercise-table > thead > tr > th:nth-child(3)"});
    exerciseCalories.click();
    driver.sleep(1000);
    exerciseCalories.click();
    driver.sleep(1000);
    exerciseCalories.click();

    driver.findElement({css: '#exercise-table-body tr:nth-child(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "exercise3");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(1) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "333");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(2) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "exercise1");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(2) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "111");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(3) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "exercise2");
    });

    driver.findElement({css: '#exercise-table-body tr:nth-child(3) td:nth-child(3)'}).getText().then(function(textValue) {
      assert.equal(textValue, "222");
    });
  });
});
