/* global self */
import Ember from 'ember';
import appboy from 'appboy';

const { ab: { InAppMessage: { ClickAction } } } = appboy;
const { Logger: { assert } } = Ember;

// Since we don't include ouibounce unless you need it, we need to conditionally
// import the module from require.
function conditionalModule(module) {
  const rjs = self.requirejs;
  if (
    (rjs.has && rjs.has(module)) ||
    (!rjs.has && (rjs.entries[module] || rjs.entries[module + '/index']))
  ) {
    return self.require(module).default;
  }
}

export function initialize(appInstance) {
  // This is what's causing incompatibility with 1.13
  const config = appInstance.resolveRegistration('config:environment');
  assert(
    config.appboy.apiKey !== undefined,
    'You must set appboy.apiKey in your environment.js file for ember-appboy to work correctly.'
  );

  appboy.initialize(config.appboy.apiKey);

  if (!config.appboy.coreOnly) {
    appboy.display.automaticallyShowNewInAppMessages();

    const _superShowInAppMessage = appboy.display.showInAppMessage;

    appboy.display.showInAppMessage = function(inAppMessage) {
      const router = appInstance.get('router');

      // If the message or buttons within the message have a URI, we need
      // to grab the URI and hide it from appboy to do a "soft" transition
      // with the Ember Router vs. an anchor tag, which causes the app to
      // refresh when clicked.
      [inAppMessage, ...inAppMessage.buttons].forEach(function(item) {
        if (item.clickAction === ClickAction.URI && item.uri) {
          const uri = item.uri;
          item.subscribeToClickedEvent(() => {
            Ember.run(this, function() {
              router.transitionTo(uri);
            });
          });
          item.clickAction = ClickAction.NULL;
          item.uri = undefined;

          return item;
        }
      });

      _superShowInAppMessage(inAppMessage);
    };
  }

  if (config.appboy.logExitIntent) {
    let ouibounce = conditionalModule('ouibounce');
    ouibounce(false, {
      callback: function() { appboy.logCustomEvent('exit intent'); }
    });
  }

  appboy.openSession();
}

export default {
  name: 'appboy',
  initialize
};
