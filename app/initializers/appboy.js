import Ember from 'ember';
import appboy from 'appboy';
import ENV from '../config/environment';

const { Logger: { assert } } = Ember;

export function initialize(/* application */) {
  assert(
    ENV.appboy.apiKey !== undefined,
    'You must set appboy.apiKey in your environment.js file for ember-appboy to work correctly.'
  );
  appboy.initialize(ENV.appboy.apiKey);
  appboy.openSession();
}

export default {
  name: 'appboy',
  initialize
};
