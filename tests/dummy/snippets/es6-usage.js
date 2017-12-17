import Service from '@ember/service';
import appboy from 'appboy';

// the Appboy ES6 module can be used anywhere, including
// Components, Routes, Controllers, etc.
export default Service.extend({
  userChanged(user) {
    // your custom logic
    appboy.changeUser(user.get('id'));
  }
});
