import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/coffee',
  isActive() {
    return this.collection.active === this;
  }
});
