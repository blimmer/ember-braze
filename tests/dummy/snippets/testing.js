// tests/test-helper.js

// Before all tests run, create a mock and replace the standard appboy package.
let appboyApi = {
  initialize() {},
  openSession() {},
  changeUser() {},
  logCustomEvent() {},
  display: {
    automaticallyShowNewInAppMessages() {},
    destroyFeed() {},
    showFeed() {},
    toggleFeed() {},
    showInAppMessage() {},
  },
};
window.appboyMock = sandbox.mock(appboyApi);
define('appboy', [], () => { return { default: appboyApi }; });

// tests/unit/my-test.js
test('it does something', function(assert) {
  window.appboyMock.expects('changeUser').once();

  // do something

  window.appboyMock.verify();
});
