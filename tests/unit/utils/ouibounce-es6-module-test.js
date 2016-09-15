import { module, test } from 'qunit';
import ouibounce from 'ouibounce';

module('Unit | Utility | ouibounce es6 module');

test('it exposes ouibounce as an es6 module', function(assert) {
  assert.ok(ouibounce, 'appboy exports an object');
});

test('it exposes the ouibounce constructor', function(assert) {
  assert.equal(typeof ouibounce.constructor, 'function');
});
