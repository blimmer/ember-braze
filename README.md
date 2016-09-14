# ember-appboy
[![Build Status](https://travis-ci.org/blimmer/ember-appboy.svg?branch=master)](https://travis-ci.org/blimmer/ember-appboy)

ember-appboy exposes the [appboy-web-sdk](https://github.com/Appboy/appboy-web-sdk)
to your Ember app.

## Installation

```bash
ember install ember-appboy
```

## Usage

### API Key
You must set your api key for appboy to work correctly.

```javascript
// config/environment.js
module.exports = function(environment) {
  return {
    appboy: {
      apiKey: 'your-api-key'
    }
  };
}
```

### Initializer
By default, the
[initializer](https://github.com/blimmer/ember-appboy/blob/master/addon/instance-initializers/appboy.js)
is very simple. You'll likely want to customize it for your needs. To do this,
create an initializer that overrides the addon's flavor:

```bash
ember g instance-initializer appboy
```

Take a look at the
[addon's implementation](https://github.com/blimmer/ember-appboy/blob/master/addon/initializers/appboy.js)
to get a feel for what you should do in your custom initializer. The
[appboy-web-sdk docs](https://www.appboy.com/documentation/Web/)
will also help here.

### ES6 Module
The appboy SDK is exposed by as ES6 module. You can import it and call methods
on it, just like you would with the global `window.appboy` version.

```javascript
import appboy from 'appboy';

// Can be used anywhere - services, routes, components, etc.
export default Ember.Route.extend({
  actions: {
    userDidChange(user) {
      appboy.changeUser(user.get('id'));
    }
  }
});
```

## Configuration

## Core SDK Only
If you only want to use the core-sdk (e.g. you won't be displaying any of the UI
elements like In-App Messaging, the News Feed, and Feedback), you can define that
in your `config/environment.js` file.

```javascript
// config/environment.js
module.exports = function(environment) {
  return {
    appboy: {
      apiKey: 'your-api-key',
      coreOnly: true
    }
  };
}
```

## Developing

* `git clone <repository-url>` this repository
* `cd ember-appboy`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
