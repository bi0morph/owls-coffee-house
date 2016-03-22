import Service from 'backbone.service';
import nestModel from '../nest/model';
import FlashesService from '../flashes/service';

// there is a private data
//TODO: find other way create private properties in ES2015
let _motion = {
      brewed: true,
      timer: 5, // minutes
      camera: null,
      onSuccess: null,
      onError: null
    };
const CoffeePotService = Service.extend({
  setup() {
    nestModel.on('change:data', this.handleMotion.bind(this));
  },

  requests: {
    brew: 'brew',
    setBrewWhenMotion: 'setBrewWhenMotion'
  },

  brew() {
    return new Promise(function (resolve) {
      setTimeout(function() {
        resolve('Coffee is hot!');
      }, 2000);
    });
  },
  handleMotion() {
    if (!_motion.brewed) {
      let _camera = nestModel.data.devices &&
        nestModel.data.devices.cameras[_motion.camera];
      if (!_camera) {
        this.onError(`No camera with such id: ${_motion.camera}`);
        _motion.brewed = true;
      } else if(_camera.is_online && _camera.last_event.has_motion) {
        setTimeout(function () {
          FlashesService.request('add', {
            timeout : 7000,
            type    : 'success',
            title   : `Good morning!`,
            body    : `Take you hot coffee`
          });
          _motion.brewed = true;
        }, _motion.timer * 60 * 1000);
      }
    }
  },

  setBrewWhenMotion(options) {
    options.timer = Number( options.timer );

    if ( isNaN( options.timer ) || options.timer < 0) {
      this.onError('Something wrong with timer', options.timer);
    }
    if (!options.camera) {
      this.onError('Something wrong with camera' , options.camera);
    }
    console.log(options);
    _motion = {
      brewed: false,
      timer: options.timer,
      camera: options.camera
    };
  },

  onError(text) {
    FlashesService.request('add', {
      timeout : 7000,
      type    : 'error',
      title   : `Something happen while brew`,
      body    : text
    });
  }
});

export default new CoffeePotService();
