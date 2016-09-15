import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('in-app-messages', function() {
    this.route('example-1');
    this.route('example-2');
  });
  this.route('exit-intent');
  this.route('configuration');
  this.route('analytics');
  this.route('news-feed');
});

export default Router;
