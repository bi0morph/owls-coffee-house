import {ItemView} from 'backbone.marionette';
import FlashesService from '../../flashes/service';
import template from './template.hbs';
import {history} from 'backbone';

export default ItemView.extend({
  template: template,
  initialize: function() {
    this.model.on('change:data', this.render.bind(this));
    this.model.on('change:isNestDisconnected', this.render.bind(this));
  },
  events: {
    'submit form': 'setUpOnWakeUp'
  },
  setUpOnWakeUp(e) {
    e.preventDefault();

    let minute = this.$el.find('.when-make').val(),
      cameraId = this.$el.find('.camera').val();

    let cameraName = this.model.data.devices.cameras[cameraId].name_long;

    // TODO: send to coffee machine
    FlashesService.request('add', {
      timeout : 70000,
      type    : 'info',
      title   : `Ok!`,
      body    : `Owl will make coffee when you wake up after ` +
                `${minute} minute. Owl use camera: ${cameraName}.`
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
