import {Router} from 'backbone-routing';
import HeaderService from '../header/service';
import LayoutView from './layout-view';
import IndexRoute from './index/route';
import WakeUpRoute from './wake-up/route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.listenTo(this, 'before:enter', this.onBeforeEnter);

    HeaderService.request('add', {
      name: 'Coffee Maker',
      path: 'coffee',
      type: 'primary'
    });
  },

  onBeforeEnter() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
    HeaderService.request('activate', {
      path: 'coffee'
    });
  },

  routes: {
    'coffee'  : 'index',
    'coffee/wake-up'  : 'wakeUp'
  },

  index() {
    return new IndexRoute({
      layout: this.layout,

    });
  },

  wakeUp() {
    return new WakeUpRoute({
      layout: this.layout
    });
  }
});
