/* global self */
import Ember from 'ember';
import appboy from 'appboy';
import { parse } from 'ember-appboy/utils/url';
import requireModule from 'ember-require-module';

const { ab: { InAppMessage: { ClickAction } } } = appboy;
const { Logger: { assert } } = Ember;

export function getAppRoute(uri) {
  const uriInfo = parse(uri);

  // For now, assume that everything in the same hostname is within the Ember
  // app. Someday, it might make sense to ask the router to recongize the URI
  // and determine if it can be handled.
  if (uriInfo.hostname === window.location.hostname) {
    return uriInfo.pathname;
  }
}

export function initialize(appInstance) {
  // This is what's causing incompatibility with 1.13
  const config = appInstance.resolveRegistration('config:environment');
  assert(
    config.appboy.apiKey !== undefined,
    'You must set appboy.apiKey in your environment.js file for ember-appboy to work correctly.'
  );

  appboy.initialize(config.appboy.apiKey, config.appboy.options);

  if (!config.appboy.coreOnly) {
    const _superShowInAppMessage = appboy.display.showInAppMessage;

    appboy.display.showInAppMessage = function(inAppMessage) {
      const router = appInstance.get('router');

      // If the message or buttons within the message have a URI, we need
      // to grab the URI and hide it from appboy to do a "soft" transition
      // with the Ember Router vs. an anchor tag, which causes the app to
      // refresh when clicked.
      inAppMessage.buttons = inAppMessage.buttons || [];
      [inAppMessage, ...inAppMessage.buttons].forEach(function(item) {
        if (item.clickAction === ClickAction.URI && item.uri) {
          const routerPath = getAppRoute(item.uri);
          if (!routerPath) { return; } // unrecognized route or different domain

          item.subscribeToClickedEvent(() => {
            Ember.run(this, function() {
              router.transitionTo(routerPath);
            });
          });
          item.clickAction = ClickAction.NULL;
          item.uri = undefined;
        }
      });

      _superShowInAppMessage(inAppMessage);
    };

    appboy.display.automaticallyShowNewInAppMessages();
  }

  if (config.appboy.logExitIntent) {
    let ouibounce = requireModule('ouibounce');
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
