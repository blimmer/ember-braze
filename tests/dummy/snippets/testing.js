// tests/test-helper.js

// Use this as a fake version of the Appboy Api
const appboyApi = {
  initialize(apiKey, options) { },
  changeUser(userId) { },
  destroy() { },
  getCachedFeed() { },
  getUser() { },
  isPushBlocked() { },
  isPushGranted(yesCallback, noCallback, safariWebsitePushId) { },
  isPushSupported() { },
  logCardClick(card) { },
  logCardImpressions(cards) { },
  logCustomEvent(eventName, eventProperties) { },
  logFeedDisplayed() { },
  logInAppMessageButtonClick(button, inAppMessage) { },
  logInAppMessageClick(inAppMessage) { },
  logInAppMessageImpression(inAppMessage) { },
  logPurchase(productId, price, currencyCode, quantity, purchaseProperties) { },
  openSession() { },
  registerAppboyPushMessages(successCallback, deniedCallback, safariWebsitePushId) { },
  removeAllSubscriptions() { },
  removeSubscription(subscriptionGuid) { },
  requestFeedRefresh() { },
  requestImmediateDataFlush() { },
  requestInAppMessageRefresh(count) { },
  setLogger(loggerFunction) { },
  submitFeedback(replyToEmail, message, isReportingABug, successCallback, errorCallback) { },
  subscribeToFeedUpdates(subscriber) { },
  subscribeToNewInAppMessages(subscriber) { },
  toggleAppboyLogging() { },
  unregisterAppboyPushMessages() { },
  ab: {
    Feed: { },
    User: { },
    InAppMessage: {
      ClickAction() { }
    }
  },
  display: {
    automaticallyShowNewInAppMessages() { },
    destroyFeed() { },
    showFeed() { },
    toggleFeed() { },
    showInAppMessage() { }
  }
};

// Before all tests run, create a mock and replace the standard appboy package.
window.appboyMock = sandbox.mock(appboyApi);
define('appboy', [], () => { return { default: appboyApi }; });

// tests/unit/my-test.js
test('it does something', function(assert) {
  window.appboyMock.expects('changeUser').once();

  // do something

  window.appboyMock.verify();
});
