import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
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
  this.route('testing');
});

export default Router;
