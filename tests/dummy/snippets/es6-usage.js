import Ember from 'ember';
import appboy from 'appboy';

// the Appboy ES6 module can be used anywhere, including
// Components, Routes, Controllers, etc.
export default Ember.Service.extend({
  userChanged(user) {
    // your custom logic
    appboy.changeUser(user.get('id'));
  }
});
