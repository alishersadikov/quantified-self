var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('exercises', function() {
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

  test.xit('should allow me to add an exercise name and calories', function() {
    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});

    name.sendKeys('test name');
    name.getAttribute('value').then(function(value) {
      assert.equal(value, 'test name');
    });

    calories.sendKeys('123');
    calories.getAttribute('value').then(function(value) {
      assert.equal(value, '123');
    });
  });

  test.xit('should allow me to create a exercise', function() {
    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

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
    driver.executeScript("window.localStorage.setItem('exercises', '{cheetos:1000}')");

    driver.get("http://localhost:8080/webpack-dev-server/");
    driver.executeScript("return window.localStorage.getItem('exercises', '{cheetos:1000}')")
    .then(function(exercises){
      assert.equal(exercises, '{cheetos:1000}');
    });
  })

  test.xit("it prepends the added exercise below the headers above the other exercises", function(){
    driver.get('http://localhost:8080/exercises.html');
    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
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

  test.xit("it clears the input fields after a exercise is successfully submitted", function(){
    driver.get('http://localhost:8080/exercises.html');
    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
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

  test.xit("exercises persist after the page is refreshed and display in the correct order", function(){
    driver.get('http://localhost:8080/exercises.html');
    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
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

    driver.get('http://localhost:8080/exercises.html');

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

  test.xit('removes the exercise from the table when you click the delete button on that line', function() {
    driver.get('http://localhost:8080/exercises.html')
    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('test name 1');
    calories.sendKeys('123');
    submitButton.click();

    driver.sleep(1000);

    driver.findElement({css: '#exercise-table tbody tr td:nth-child(3)'}).click();

    driver.findElements({css: 'tr:nth-child(2)'}).then(function(element){
      assert.equal(0, element);
    });
  });

  test.it('if name is clicked it becomes an input field that will display that saves if you click hit return', function(){
    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('name');
    calories.sendKeys('456');
    submitButton.click();

    driver.sleep(1000);

    var exerciseCell = driver.findElement({css: 'td.enclosed-cells:nth-child(1)'})

    exerciseCell.click()
    driver.sleep(1000);

    exerciseCell.clear()

    exerciseCell.sendKeys("Newer Name")
    exerciseCell.sendKeys(webdriver.Key.RETURN)



    driver.findElement({css: 'td.enclosed-cells:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, "Newer Name");
    });
  });

  test.it('if calorie is clicked it becomes an input field that will display and that saves changes if you  hit return', function(){
    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'new-exercise-name'});
    var calories = driver.findElement({id: 'new-exercise-calories'});
    var submitButton = driver.findElement({id: 'new-submit'});

    name.sendKeys('name');
    calories.sendKeys('456');
    submitButton.click();

    driver.sleep(1000);

    var exerciseCell = driver.findElement({css: 'td.enclosed-cells:nth-child(2)'})

    exerciseCell.click()
    driver.sleep(1000);

    exerciseCell.clear()

    exerciseCell.sendKeys("999")
    exerciseCell.sendKeys(webdriver.Key.RETURN)



    driver.findElement({css: 'td.enclosed-cells:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, "999");
    });
  });

});
