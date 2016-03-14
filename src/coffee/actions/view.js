import nprogress from 'nprogress';
import FlashesService from '../../flashes/service';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import ModalService from '../../modal/service';

export default ItemView.extend({
  template: template,

  events: {
    'click .actions__make-now' : 'handleMakeCoffeeNow',
    'click .actions__make-later' : 'handleMakeCoffeeLater'
  },
  handleMakeCoffeeNow() {
    ModalService.request('confirm', {
      title : 'Confirm making coffee now',
      text  : `Are you sure you want to make coffee now?`
    }).then(confirmed => {
      if (!confirmed) {
        return;
      }

      // TODO: connect to coffee machine and make coffee
      nprogress.start();

      return new Promise(resolve => {
        setTimeout(resolve, 2000);
      }).then(() => this.handleMakeCoffeeSuccess());
    });
  },

  handleMakeCoffeeLater() {
    // TODO: change this simple prompt to some modal with timepicker

    ModalService.request('prompt', {
      title : 'When should make coffee',
      text  : `Please, select time when owl should make coffee for you?`
    }).then(confirmed => {
      if (!confirmed) {
        return;
      }

      FlashesService.request('add', {
        timeout : 70000,
        type    : 'info',
        title   : `Ok!`,
        body    : `Owl will make coffee for you later.`
      });
    });
  },

  handleMakeCoffeeSuccess() {
    FlashesService.request('add', {
      timeout : 7000,
      type    : 'success',
      title   : `It's done!`,
      body    : `You can take your coffee.`
    });
  }
});
