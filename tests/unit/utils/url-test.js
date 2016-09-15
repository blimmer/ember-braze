import { parse } from 'ember-appboy/utils/url';
import { module, test } from 'qunit';

const url = 'https://imoscar.com:2/give-pop?pop=your#hair';

let result;
module('Unit | Utility | url', {
  beforeEach() {
    result = parse(url);
  }
});

test("parses protocol", function(assert) {
  assert.equal(result.protocol, 'https:');
});
test("parses host", function(assert) {
  assert.equal(result.host, 'imoscar.com:2');
});
test("parses port", function(assert) {
  assert.equal(result.port, '2');
});
test("parses hostname", function(assert) {
  assert.equal(result.hostname, 'imoscar.com');
});
test("parses hash", function(assert) {
  assert.equal(result.hash, '#hair');
});
test("parses search", function(assert) {
  assert.equal(result.search, '?pop=your');
});
test("parses pathname", function(assert) {
  assert.equal(result.pathname, '/give-pop');
});
test("parses origin", function(assert) {
  assert.equal(result.origin, 'https://imoscar.com:2');
});

test("handles undefined", function(assert) {
  let undefinedResult = parse();
  assert.equal(typeof undefinedResult, 'object');
});
