import {Route} from 'backbone-routing';
import ActionsView from '../actions/view';
import nestModel from '../../nest/model';
import WakeUpView from './view';

export default Route.extend({
  initialize(options = {}) {
    this.layout = options.layout;
  },

  render() {
    this.status = new WakeUpView({
      model: nestModel
    });

    this.actions = new ActionsView({
      model: nestModel
    });

    this.layout.status.show(this.status);
    this.layout.actions.show(this.actions);
  }
});
