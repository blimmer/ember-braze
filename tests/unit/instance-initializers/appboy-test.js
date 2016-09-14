import Ember from 'ember';
import { initialize } from 'dummy/instance-initializers/appboy';
import { module } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import test from 'dummy/tests/ember-sinon-qunit/test';
import appboy from 'appboy';
import sinon from 'sinon';

let configStub,
    sandbox,
    appboyInitialize,
    appboyOpenSession,
    appboyAutomaticallyShowNewInAppMessages;

module('Unit | Instance Initializer | appboy', {
  before() {
    sandbox = sinon.sandbox.create();
  },

  beforeEach: function() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();
      // default
      configStub = sandbox.stub(this.appInstance, 'resolveRegistration')
                          .withArgs('config:environment')
                          .returns({ appboy: { apiKey: 'abc123' } });
      appboyInitialize = sandbox.stub(appboy, 'initialize');
      appboyOpenSession = sandbox.stub(appboy, 'openSession');
      appboyAutomaticallyShowNewInAppMessages = sandbox.stub();
      appboy.display = { automaticallyShowNewInAppMessages: appboyAutomaticallyShowNewInAppMessages };
    });
  },
  afterEach: function() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
    sandbox.restore();
  },
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(this.appInstance);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});

test('it calls initialize with the api key', function(assert) {
  initialize(this.appInstance);

  assert.ok(appboyInitialize.withArgs('abc123').calledOnce);
});

test('it sets up in-app message display automatically', function(assert) {
  initialize(this.appInstance);

  assert.ok(appboyAutomaticallyShowNewInAppMessages.calledOnce);
});

test('it does not set up in-app message display when only using core', function(assert) {
  configStub.returns({ appboy: { apiKey: 'abc123', coreOnly: true } });
  initialize(this.appInstance);

  assert.notOk(appboyAutomaticallyShowNewInAppMessages.called);
});

test('it opens the session', function(assert) {
  initialize(this.appInstance);

  assert.ok(appboyOpenSession.calledOnce);
});
