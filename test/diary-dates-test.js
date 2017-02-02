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

  test.it('will show the previous date when you click on the left button', function() {
    driver.get('http://localhost:8080/index.html');

    var currentDate = new Date();
    var expected = getFullDate(-1)


    function getFullDate(day=0) {
      var oneDay = 24 * 60 * 60 * 1000;
      if (day === -1) currentDate = new Date(currentDate.getTime() - oneDay);
      if (day === +1) currentDate = new Date(currentDate.getTime() + oneDay);

      return formatCurrentMonth(currentDate) + " " +
             formatCurrentDay(currentDate) + ", " +
             formatCurrentYear(currentDate);
    }

    function formatCurrentMonth(currentDate) {
      var months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

      return months[currentDate.getMonth()];
    }

    function formatCurrentDay(currentDate) {
      var rawDay = currentDate.getDate();
      var dateSuffixes = {"1":"st", "2":"nd", "3":"rd"};
      var suffix = "";

      if (dateSuffixes[rawDay]) {
        suffix = dateSuffixes[rawDay];
      } else {
        suffix = "th";
      }

      return rawDay + suffix;
    }

    function formatCurrentYear(currentDate) {
      return currentDate.getYear() + 1900;
    }


    var backButton = driver.findElement({css: 'button.edges.left-arrow'});
    var calories = driver.findElement({css: 'body > div.container > marquee > i > strong > span'});
    backButton.click()
    driver.findElement({css: 'body > div.container > marquee > i > strong > span'}).getText().then(function(textValue) {
      assert.equal(textValue, expected);
    });
  });


  test.it('will show the next date when you click on the right button', function() {
    driver.get('http://localhost:8080/index.html');

    var currentDate = new Date();
    var expected = getFullDate(+1)


    function getFullDate(day=0) {
      var oneDay = 24 * 60 * 60 * 1000;
      if (day === -1) currentDate = new Date(currentDate.getTime() - oneDay);
      if (day === +1) currentDate = new Date(currentDate.getTime() + oneDay);

      return formatCurrentMonth(currentDate) + " " +
             formatCurrentDay(currentDate) + ", " +
             formatCurrentYear(currentDate);
    }

    function formatCurrentMonth(currentDate) {
      var months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

      return months[currentDate.getMonth()];
    }

    function formatCurrentDay(currentDate) {
      var rawDay = currentDate.getDate();
      var dateSuffixes = {"1":"st", "2":"nd", "3":"rd"};
      var suffix = "";

      if (dateSuffixes[rawDay]) {
        suffix = dateSuffixes[rawDay];
      } else {
        suffix = "th";
      }

      return rawDay + suffix;
    }

    function formatCurrentYear(currentDate) {
      return currentDate.getYear() + 1900;
    }


    var backButton = driver.findElement({css: 'button.edges.right-arrow'});
    var calories = driver.findElement({css: 'body > div.container > marquee > i > strong > span'});
    backButton.click()
    driver.findElement({css: 'body > div.container > marquee > i > strong > span'}).getText().then(function(textValue) {
      assert.equal(textValue, expected);
    });
  });
});
