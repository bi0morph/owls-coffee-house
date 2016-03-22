import {ItemView} from 'backbone.marionette';
import FlashesService from '../../flashes/service';
import CoffeePotService from '../../coffee-pot/service';
import template from './template.hbs';
import {history} from 'backbone';

export default ItemView.extend({
  template: template,
  initialize: function() {
    this.listenTo(this.model, 'change:data', this.render.bind(this));
    this.listenTo(this.model,
      'change:isNestDisconnected',
      this.render.bind(this));
  },
  events: {
    'submit form': 'setUpOnWakeUp'
  },
  setUpOnWakeUp(e) {
    e.preventDefault();

    let _minute = this.$el.find('.when-make').val(),
      _cameraId = this.$el.find('.camera').val();

    let _cameraName = this.model.data.devices.cameras[_cameraId].name_long;

    // TODO: send to coffee machine
    CoffeePotService.request('setBrewWhenMotion', {
      timer: _minute,
      camera: _cameraId
    });

    FlashesService.request('add', {
      timeout : 7000,
      type    : 'info',
      title   : `Ok!`,
      body    : `Owl will make coffee when you wake up after ` +
                `${_minute} minute. Owl use camera: ${_cameraName}.`
    });

    history.navigate('coffee', {
      trigger: true,
      replace: true
    });
  },
  serializeData () {
    const result = {
      isNestDisconnected: this.model.get('isNestDisconnected'),
      cameras: []
    };

    if (this.model.data && this.model.data.devices) {
      result.cameras = this.model.data.devices.cameras;
    }
    return result;
  }
});
