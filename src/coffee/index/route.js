import {Route} from 'backbone-routing';
import storage from '../storage';
import StatusView from '../status/view';
import ActionsView from '../actions/view';

export default Route.extend({
  initialize(options = {}) {
    this.layout = options.layout;
    this.listenTo(this, 'enter', this.onEnter);
    this.listenTo(this, 'fetch', this.onFetch);
  },

  fetch() {
    return storage.findAll().then(collection => {
      this.collection = collection;
      this.model = collection.slice().pop();
    });
  },

  render() {
    this.status = new StatusView({
      model: this.model
    });

    this.actions = new ActionsView();

    this.layout.status.show(this.status);
    this.layout.actions.show(this.actions);
  }
});
