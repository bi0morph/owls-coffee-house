import nprogress from 'nprogress';
import FlashesService from '../../flashes/service';
import CoffeePotService from '../../coffee-pot/service';

import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import ModalService from '../../modal/service';
import {history} from 'backbone';


export default ItemView.extend({
  template: template,

  initialize: function () {
    this.listenTo(this.model,'change', this.render.bind(this));
  },
  events: {
    'click .actions__make-now' : 'handleMakeCoffeeNow',
    'click .actions__make-later' : 'handleMakeCoffeeLater',
    'click .actions__wake-up' : 'handleWakeUp'
  },
  handleWakeUp() {
    history.navigate('coffee/wake-up', {
      trigger: true,
      replace: true
    });
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
      CoffeePotService.request('brew')
        .then((text)=> {
          this.handleMakeCoffeeSuccess(text);
          nprogress.done();
        })
        .catch((text) => {
          this.handleMakeCoffeeError(text);
          nprogress.done();
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
  },

  handleMakeCoffeeError(text) {
    FlashesService.request('add', {
      timeout : 7000,
      type    : 'error',
      title   : `Something happen`,
      body    : text
    });
  }
});
