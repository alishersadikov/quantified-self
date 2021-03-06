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
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('new test name');
    calories.sendKeys('456');
    submitButton.click();

    driver.sleep(1000);

    driver.findElement({css: 'td.enclosed-cells:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, "new test name");
    });
  })

  test.it("can set localStorage and persist across refreshes", function(){
    driver.get("http://localhost:8080/webpack-dev-server/");
    driver.executeScript("window.localStorage.setItem('foods', '{cheetos:1000}')");

    driver.get("http://localhost:8080/webpack-dev-server/");
    driver.executeScript("return window.localStorage.getItem('foods', '{cheetos:1000}')")
    .then(function(foods){
      assert.equal(foods, '{cheetos:1000}');
    });
  })

  test.it("it prepends the added food below the headers above the other foods", function(){
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});


    name.sendKeys('test name 1');
    calories.sendKeys('123');
    submitButton.click();

    name.sendKeys('test name 2');
    calories.sendKeys('456');
    submitButton.click();
    driver.sleep(1000);

    driver.findElement({css: 'tr:nth-child(1) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, "test name 2");
    });

    driver.findElement({css: 'tr:nth-child(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "456");
    });
  });

  test.it("it clears the input fields after a food is successfully submitted", function(){
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('test name 1');
    calories.sendKeys('123');
    submitButton.click();

    name.sendKeys('test name 2');
    calories.sendKeys('456');
    submitButton.click();

    driver.sleep(1000);

    driver.findElement({css: 'tr:nth-child(1) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, "test name 2");
    });

    driver.findElement({css: 'tr:nth-child(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "456");
    });
  });

  test.it("foods persist after the page is refreshed and display in the correct order", function(){
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('test name 1');
    calories.sendKeys('123');
    submitButton.click();

    name.sendKeys('test name 2');
    calories.sendKeys('456');
    submitButton.click();

    driver.sleep(1000);

    driver.findElement({css: 'tr:nth-child(1) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, "test name 2");
    });

    driver.findElement({css: 'tr:nth-child(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "456");
    });

    driver.findElement({css: 'tr:nth-child(2) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, "test name 1");
    });

    driver.findElement({css: 'tr:nth-child(2) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "123");
    });

    driver.get('http://localhost:8080/foods.html');

    driver.findElement({css: 'tr:nth-child(1) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, "test name 2");
    });

    driver.findElement({css: 'tr:nth-child(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "456");
    });

    driver.findElement({css: 'tr:nth-child(2) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, "test name 1");
    });

    driver.findElement({css: 'tr:nth-child(2) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "123");
    });
  });

  test.it('removes the food from the table when you click the delete button on that line', function() {
    driver.get('http://localhost:8080/foods.html')
    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('test name 1');
    calories.sendKeys('123');
    submitButton.click();

    driver.sleep(1000);

    driver.findElement({css: '#food-table tbody tr td:nth-child(3)'}).click();

    driver.findElements({css: 'tr:nth-child(2)'}).then(function(element){
      assert.equal(0, element);
    });
  });

  test.it('if name is clicked it becomes an input field that will display that saves if you click elsewhere', function(){
    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('name');
    calories.sendKeys('456');
    submitButton.click();

    driver.sleep(1000);

    var foodCell = driver.findElement({css: 'td.enclosed-cells:nth-child(1)'})

    foodCell.click()
    driver.sleep(1000);

    foodCell.clear()

    foodCell.sendKeys("Newer Name")
    foodCell.sendKeys(webdriver.Key.RETURN)



    driver.findElement({css: 'td.enclosed-cells:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, "Newer Name");
    });
  });

  test.it('if calories field is clicked it becomes an input field that will display that saves if you click elsewhere', function(){
    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('name');
    calories.sendKeys('456');
    submitButton.click();

    driver.sleep(1000);

    var calorieCell = driver.findElement({css: 'td.enclosed-cells:nth-child(2)'})

    calorieCell.click()
    driver.sleep(1000);

    calorieCell.clear()

    calorieCell.sendKeys("1111")
    calorieCell.sendKeys(webdriver.Key.RETURN)



    driver.findElement({css: 'td.enclosed-cells:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "1111");
    });
  });

  test.it("it only shows the foods by name if they have the same name fragment", function(){
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'new-food-name'});
    var calories = driver.findElement({id: 'new-food-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});
    var filterInput =  driver.findElement({id: "filter-by-name"});

    name.sendKeys('cheese');
    calories.sendKeys('123');
    submitButton.click();

    name.sendKeys('amazing cheesits');
    calories.sendKeys('987');
    submitButton.click();

    name.sendKeys('def not yellow stuff');
    calories.sendKeys('456');
    submitButton.click();

    driver.sleep(1000);

    filterInput.sendKeys("chee")

    driver.findElement({id: 'food-table'}).getText().then(function(textValue) {
      assert.include(textValue, "cheese");
      assert.include(textValue, "amazing cheesits");
      assert.notInclude(textValue, "def not yellow stuff");
    });
  });

});
