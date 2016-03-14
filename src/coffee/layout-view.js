import {LayoutView} from 'backbone.marionette';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'container',
  regions: {
    status : '.coffee__status',
    actions  : '.coffee__actions'
  }
});
