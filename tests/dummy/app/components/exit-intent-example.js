import Component from '@ember/component';
import layout from '../templates/components/exit-intent-example';
import appboy from 'appboy';
import ouibounce from 'ouibounce';

export default Component.extend({
  layout,

  ouibounce: undefined,
  shown: false,

  didInsertElement() {
    this._super(...arguments);

    const instance = ouibounce(this.$().get(0), {
      aggressive: true,
      callback: () => {
        this.showAppboyModal();
      },
    });

    this.set('ouibounce', instance);
  },

  willDestroyElement() {
    this._super(...arguments);
    let instance = this.get('ouibounce');
    if (instance) { instance.disable(); }
  },

  showAppboyModal() {
    let modal = new appboy.ab.ModalMessage();
    modal.header  = "PSA";
    modal.message = "Please convince your marketing team to not be terrible internet citizens with this functionality kthnxbai.";
    appboy.display.showInAppMessage(modal);
    this.set('shown', true);
  },

  refresh() {
    window.location.reload();
  },
});
