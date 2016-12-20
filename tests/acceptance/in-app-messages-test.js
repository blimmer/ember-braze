import test from 'dummy/tests/ember-sinon-qunit/test';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import appboy from 'appboy';

moduleForAcceptance('Acceptance | in app messages');

test('modals with URI ClickActions handle transition correctly', function(assert) {
  visit('/in-app-messages');
  click('#trigger-modal-with-transition');
  andThen(function() {
    let $el = findWithAssert('.ab-in-app-message', 'body');
    assert.equal($el.length, 1);
  });
  click('.ab-in-app-message', 'body');
  andThen(function() {
    assert.equal(currentURL(), '/in-app-messages/example-1');
  });
});

test('modals with one button ClickActions handle transition correctly', function(assert) {
  visit('/in-app-messages');
  click('#trigger-modal-with-one-button');
  andThen(function() {
    let $el = findWithAssert('.ab-in-app-message', 'body');
    assert.equal($el.length, 1);
  });
  click('.ab-message-button', 'body');
  andThen(function() {
    assert.equal(currentURL(), '/in-app-messages/example-1');
  });
});

test('modals with two button ClickActions handle transition correctly - first button', function(assert) {
  visit('/in-app-messages');
  click('#trigger-modal-with-two-buttons');
  andThen(function() {
    let $el = findWithAssert('.ab-in-app-message', 'body');
    assert.equal($el.length, 1);
  });
  click('.ab-message-button:nth-of-type(1)', 'body');
  andThen(function() {
    assert.equal(currentURL(), '/in-app-messages/example-1');
  });
});

test('modals with two button ClickActions handle transition correctly - second button', function(assert) {
  visit('/in-app-messages');
  click('#trigger-modal-with-two-buttons');
  andThen(function() {
    let $el = findWithAssert('.ab-in-app-message', 'body');
    assert.equal($el.length, 1);
  });
  click('.ab-message-button:nth-of-type(2)', 'body');
  andThen(function() {
    assert.equal(currentURL(), '/in-app-messages/example-2');
  });
});

test('modals with external links', function(assert) {
  const prevOpenUri = appboy.ab.WindowUtils.openUri;
  appboy.ab.WindowUtils.openUri = this.sandbox.stub();

  visit('/in-app-messages');
  click('#trigger-modal-with-external-link');
  andThen(function() {
    let $el = findWithAssert('.ab-in-app-message', 'body');
    assert.equal($el.length, 1);
  });
  click('.ab-message-button', 'body');
  andThen(function() {
    assert.ok(appboy.ab.WindowUtils.openUri.withArgs('https://benlimmer.com').calledOnce);
    appboy.ab.WindowUtils.openUri = prevOpenUri;
  });
});

test('modals with undefined button arrays', function(assert) {
  visit('/in-app-messages');
  click('#trigger-modal-with-undefined-buttons');
  andThen(function() {
    let $el = findWithAssert('.ab-in-app-message', 'body');
    assert.equal($el.length, 1);
  });
  click('.ab-in-app-message', 'body');
});
