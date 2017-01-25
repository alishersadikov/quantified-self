var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('foods', function() {
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

  test.it('should allow me to add a food name and calories', function() {
    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});

    name.sendKeys('test name');
    name.getAttribute('value').then(function(value) {
      assert.equal(value, 'test name');
    });

    calories.sendKeys('123');
    calories.getAttribute('value').then(function(value) {
      assert.equal(value, '123');
    });
  });

  test.it('should allow me to create a food', function() {
    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-food-submit'});

    name.sendKeys('new test name');
    calories.sendKeys('456');
    submitButton.click();

    driver.sleep(1000);

    driver.findElement({css: 'td.enclosed-cells:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, "new test name");
    });
  })

  test.xit("can set localStorage and persist across refreshes", function(){
    driver.get("http://localhost:8080/webpack-dev-server/");
    driver.executeScript("window.localStorage.setItem('highScore', '340')");

    driver.get("http://localhost:8080/webpack-dev-server/");
    driver.executeScript("return window.localStorage.getItem('highScore')")
    .then(function(highScore){
      assert.equal(highScore, "340");
    });
  })

  test.xit("Does localStorage persist accross my chrome and selenium's chrome", function(){
    driver.get("http://localhost:8080/webpack-dev-server/");

    driver.executeScript("return window.localStorage.getItem('highScore')")
    .then(function(highScore){
      assert.equal(highScore, "340");
    });
  });
});
