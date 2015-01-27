var wd = require('wd');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

// initialize chai
chai.use(chaiAsPromised);
chai.should();

describe("using promises and chai-as-promised", function() {
  var browser;

  before(function() {
    browser = wd.promiseChainRemote();

    return browser.init({browserName:'chrome'});
  });

  beforeEach(function() {
    return browser.get("http://localhost:8081");
  });

  after(function() {
    return browser.quit();
  });

  it("should retrieve the page title", function() {
    return browser.title().should.become("Hello World");
  });

});
