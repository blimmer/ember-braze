import { module, test } from 'qunit';
import appboy from 'appboy';

module('Unit | Utility | appboy es6 module');

test('it exposes appboy web sdk as an es6 module', function(assert) {
  assert.ok(appboy, 'appboy exports an object');
});

test('it can initialize', function(assert) {
  assert.equal(typeof appboy.initialize, 'function');
});
