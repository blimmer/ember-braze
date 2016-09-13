import Ember from 'ember';
import AppboyInitializer from 'dummy/initializers/appboy';
import { module } from 'qunit';
import test from 'dummy/tests/ember-sinon-qunit/test';
import appboy from 'appboy';

let application;

module('Unit | Initializer | appboy', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

test('it calls initialize with the api key', function(assert) {
  const appboyInitStub = this.sandbox.stub(appboy, 'initialize');
  this.sandbox.stub(appboy, 'openSession'); // prevent errors
  AppboyInitializer.initialize(application);

  assert.ok(appboyInitStub.withArgs('abc123').calledOnce);
});

test('it opens the session', function(assert) {
  this.sandbox.stub(appboy, 'initialize'); // prevent errors
  const appboyOpenSessionStub = this.sandbox.stub(appboy, 'openSession');
  AppboyInitializer.initialize(application);

  assert.ok(appboyOpenSessionStub.calledOnce);
});
