import Service from 'backbone.service';
import nestModel from '../nest/model';

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
    brewWhenMotion: 'brewWhenMotion'
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
      console.log('change:data', nestModel.data, _motion);
    }
  },
  
  brewWhenMotion(options) {
    return new Promise((resolve, reject) => {
      options.timer = Number( options.timer );

      if ( isNaN( options.timer ) || options.timer < 0) {
        reject('Something wrong with timer', options.timer);
      }
      if (!options.camera) {
        reject('Something wrong with camera' , options.camera);
      }

      _motion = {
        brewed: false,
        timer: options.timer,
        camera: options.camera,
        onSuccess: resolve,
        onError: reject
      };
    });
  }
});

export default new CoffeePotService();
