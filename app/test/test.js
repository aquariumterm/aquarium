var wd = require('wd');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var chromedriver = require('chromedriver');

// initialize chai
chai.use(chaiAsPromised);
chai.should();

chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("using promises and chai-as-promised", function() {
  var browser;

  before(function() {
    browser = wd.promiseChainRemote();

    chromedriver.start();
    return browser.init({browserName:'chrome'});
  });

  beforeEach(function() {
    return browser.get("http://localhost:8080");
  });

  after(function(done) {
    browser.quit(function() {
      chromedriver.stop();
      done();
    });
  });

  it("should retrieve the page title", function() {
    return browser.title().should.become("Aquarium");
  });
});
