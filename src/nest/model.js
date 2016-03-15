import {Model} from 'backbone';
import Firebase from 'firebase';
import Cookies from 'js.cookie';

const _nestFirebaseRef = new Firebase('wss://developer-api.nest.com');

const NestModel = Model.extend({
  auth: function() {
    if( !_nestFirebaseRef.getAuth() ) {
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
    }
  },
  initialize: function(){
    this.auth();
    _nestFirebaseRef.on('value', (snapshot) => {
      var data = snapshot.val();
      this.data = data;
      this.trigger('change:data');
    });
  },
  defaults: {
    isNestDisconnected: true
  }
});
const nestModel = new NestModel();




export default nestModel;
