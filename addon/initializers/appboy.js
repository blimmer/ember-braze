import Ember from 'ember';
import appboy from 'appboy';
import config from 'ember-get-config';

const { Logger: { assert } } = Ember;

export function initialize(/* application */) {
  assert(
    config.appboy.apiKey !== undefined,
    'You must set appboy.apiKey in your environment.js file for ember-appboy to work correctly.'
  );
  appboy.initialize(config.appboy.apiKey);
  appboy.openSession();
}

export default {
  name: 'appboy',
  initialize
};
