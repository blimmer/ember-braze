import Ember from 'ember';
import layout from '../templates/components/in-app-messages-example';
import appboy from 'appboy';
import ENV from '../config/environment';

function disableAnimationInTest(item) {
  if (ENV.environment === 'test') {
    item.animateIn = item.animateOut = false;
  }
}

export default Ember.Component.extend({
  layout,

  isTestEnv: Ember.computed(function() {
    return ENV.environment === 'test';
  }),

  showSlideUpMessage() {
    let message = new appboy.ab.SlideUpMessage(
      "This is a Slide-Up In-App Message!"
    );
    message.slideFrom = appboy.ab.InAppMessage.SlideFrom.TOP;
    appboy.display.showInAppMessage(message);
  },

  showModal() {
    let modal = new appboy.ab.ModalMessage();
    modal.header  = "Woah, there...";
    modal.message = "Doing this might be a terrible idea but ,idk, here's a modal to make you think twice.";
    disableAnimationInTest(modal);
    appboy.display.showInAppMessage(modal);
  },

  // see https://github.com/blimmer/ember-appboy/issues/35
  showModalWithUndefinedButtons() {
    let modal = new appboy.ab.ModalMessage();
    modal.header  = "Woah, there...";
    modal.message = "Doing this might be a terrible idea but ,idk, here's a modal to make you think twice.";
    modal.buttons = undefined;
    disableAnimationInTest(modal);
    appboy.display.showInAppMessage(modal);
  },

  showModalWithTransition() {
    let modal = new appboy.ab.ModalMessage();
    modal.header  = "Forced Transition";
    modal.message = "Clicking anywhere on this modal (except the close button) will trigger a transition to the example-1 page.";
    modal.clickAction = appboy.ab.InAppMessage.ClickAction.URI;
    modal.uri = '/in-app-messages/example-1';
    disableAnimationInTest(modal);
    appboy.display.showInAppMessage(modal);
  },

  showModalWithOneButton() {
    let modal = new appboy.ab.ModalMessage();
    modal.header  = "Modal with Buttons";
    modal.message = "This is a modal with buttons that transition somewhere.";

    let button1 = new appboy.ab.InAppMessage.Button();
    button1.text = 'Example Route 1';
    button1.clickAction = appboy.ab.InAppMessage.ClickAction.URI;
    button1.uri = '/in-app-messages/example-1';

    modal.buttons = [button1];
    disableAnimationInTest(modal);
    appboy.display.showInAppMessage(modal);
  },

  showModalWithTwoButtons() {
    let modal = new appboy.ab.ModalMessage();
    modal.header  = "Modal with Buttons";
    modal.message = "This is a modal with buttons that transition somewhere.";

    let button1 = new appboy.ab.InAppMessage.Button();
    button1.text = 'Example Route 1';
    button1.clickAction = appboy.ab.InAppMessage.ClickAction.URI;
    button1.uri = '/in-app-messages/example-1';

    let button2 = new appboy.ab.InAppMessage.Button();
    button2.text = 'Example Route 2';
    button2.clickAction = appboy.ab.InAppMessage.ClickAction.URI;
    button2.uri = '/in-app-messages/example-2';

    modal.buttons = [button1, button2];
    disableAnimationInTest(modal);
    appboy.display.showInAppMessage(modal);
  },

  showModalWithExternalLink() {
    let modal = new appboy.ab.ModalMessage();
    modal.header  = "Modal with Buttons";
    modal.message = "This is a modal with a button that transitions outside the Ember App.";

    let button1 = new appboy.ab.InAppMessage.Button();
    button1.text = 'Example Route 1';
    button1.clickAction = appboy.ab.InAppMessage.ClickAction.URI;
    button1.uri = 'https://benlimmer.com';

    modal.buttons = [button1];
    disableAnimationInTest(modal);
    appboy.display.showInAppMessage(modal);
  },

  showFullWithOneButton() {
    let modal = new appboy.ab.FullScreenMessage();
    modal.header  = "Fullscreen Message with One Button";
    modal.message = "This is a fullscreen modal with a button that transitions somewhere.";
    modal.imageUrl = "https://placeholdit.imgix.net/~text?w=640&h=480";

    let button1 = new appboy.ab.InAppMessage.Button();
    button1.text = 'Example Route 1';
    button1.clickAction = appboy.ab.InAppMessage.ClickAction.URI;
    button1.uri = '/in-app-messages/example-1';

    modal.buttons = [button1];
    disableAnimationInTest(modal);
    appboy.display.showInAppMessage(modal);
  },

  showFullWithTwoButtons() {
    let modal = new appboy.ab.FullScreenMessage();
    modal.header  = "Fullscreen Message with Buttons";
    modal.message = "This is a fullscreen modal with two buttons that transition somewhere.";
    modal.imageUrl = "https://placeholdit.imgix.net/~text?w=640&h=480";

    let button1 = new appboy.ab.InAppMessage.Button();
    button1.text = 'Example Route 1';
    button1.clickAction = appboy.ab.InAppMessage.ClickAction.URI;
    button1.uri = '/in-app-messages/example-1';

    let button2 = new appboy.ab.InAppMessage.Button();
    button2.text = 'Example Route 2';
    button2.clickAction = appboy.ab.InAppMessage.ClickAction.URI;
    button2.uri = '/in-app-messages/example-2';

    modal.buttons = [button1, button2];
    disableAnimationInTest(modal);
    appboy.display.showInAppMessage(modal);
  },
});
