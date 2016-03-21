import {Model} from 'backbone';
import Firebase from 'firebase';
import Cookies from 'js.cookie';

const _nestFirebaseRef = new Firebase('wss://developer-api.nest.com');

const NestModel = Model.extend({
  authorize: function() {
    const token = Cookies.get('nest_token');
    if (token) {
      _nestFirebaseRef.authWithCustomToken(token, (error) => {
        if (error) {
          this.set('isNestDisconnected', true);
        } else {
          this.set('isNestDisconnected', false);
        }
      });
    }
  },
  isAuthorized: function() {
    return _nestFirebaseRef.getAuth();
  },
  initialize: function(){
    if (!this.isAuthorized()) {
      this.authorize();
    }

    _nestFirebaseRef.on('value', (snapshot) => {
      var data = snapshot.val();
      this.data = data;
      console.log(data);

      this.trigger('change:data');
    });
  },
  defaults: {
    isNestDisconnected: true
  }
});


export default new NestModel();
