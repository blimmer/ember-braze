# ember-appboy

ember-appboy exposes the [appboy-web-sdk](https://github.com/Appboy/appboy-web-sdk)
to your Ember app.

## Installation

```bash
ember install ember-appboy
```

## Usage
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
