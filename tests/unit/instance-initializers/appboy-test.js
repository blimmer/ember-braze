import Ember from 'ember';
import { initialize } from 'dummy/instance-initializers/appboy';
import { module } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import test from 'dummy/tests/ember-sinon-qunit/test';
import appboy from 'appboy';
import sinon from 'sinon';

let configStub,
    ouibounceStub,
    sandbox,
    appboyInitialize,
    appboyOpenSession,
    appboyLogCustomEvent,
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
      appboyLogCustomEvent = sandbox.stub(appboy, 'logCustomEvent');
      appboyAutomaticallyShowNewInAppMessages = sandbox.stub();
      appboy.display = {
        automaticallyShowNewInAppMessages: appboyAutomaticallyShowNewInAppMessages
      };
      ouibounceStub = sandbox.stub();
      define('ouibounce', [], () => { return { default: ouibounceStub }; });
    });
  },
  afterEach: function() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
    sandbox.restore();
  },
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

test('it does not initialize ouibounce by default', function(assert) {
  initialize(this.appInstance);

  assert.notOk(ouibounceStub.called);
});

test('it initializes ouibounce if logExitIntent flag is set', function(assert) {
  configStub.returns({ appboy: { apiKey: 'abc123', logExitIntent: true } });

  initialize(this.appInstance);

  assert.ok(ouibounceStub.calledOnce);
});

test('it sets up the appboy callback on ouibounce if logExitIntent flag is set', function(assert) {
  configStub.returns({ appboy: { apiKey: 'abc123', logExitIntent: true } });

  initialize(this.appInstance);

  // see https://www.appboy.com/documentation/Web/#exit-intent-messages
  assert.notOk(ouibounceStub.getCall(0).args[0]);
  const callback = ouibounceStub.getCall(0).args[1].callback;
  callback();
  assert.ok(appboyLogCustomEvent.withArgs('exit intent').calledOnce);
});
