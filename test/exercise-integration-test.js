var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('excercises', function() {
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

  // test.it(allows )

  test.it('user sees table of of exercises with name,calories', function() {
    driver.get('http://localhost:8080/exercises.html')

    var nameHeader = driver.findElement({css: 'exercise-table th:nth-child(0)'})
    var caloriesHeader = driver.findElement({css: 'exercise-table th:nth-child(1)'})

    nameHeader.getAttribute('value').then(function(value) {
      assert.equal(value, 'Name');
    });
    caloriesHeader.getAttribute('value').then(function(value) {
      assert.equal(value, 'Calories');
    });
  });
});
