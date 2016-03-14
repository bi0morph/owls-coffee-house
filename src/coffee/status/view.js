import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

const MINIMUM_BEANS = 5,
      MINIMUM_WATER = 100;
export default ItemView.extend({
  template: template,

  getBeans() {
    const beansVal = this.model.get('coffeeBeansInContrainer'),
      beansUnit = this.model.get('coffeeBeansUnits');

    let beansClass = beansVal > MINIMUM_BEANS ? 'success': 'warning',
      beansText = `${beansVal} ${beansUnit}`;
    return {
      class: beansClass,
      text: beansText
    };
  },
  getWater() {
    const waterInTank = this.model.get('waterInTank'),
      waterUnits = this.model.get('waterUnits');

    const waterClass = waterInTank > MINIMUM_WATER ? 'success': 'warning',
      waterText = `${waterInTank} ${waterUnits}`;

    return {
      class: waterClass,
      text: waterText
    };
  },
  getConnected() {
    const connected = this.model.get('connected');

    return {
      class: connected ? 'success': 'warning',
      text: connected ? 'yes': 'no'
    };
  },

  serializeData() {

    const attr = {
      name: this.model.get('name'),
      beans: this.getBeans(),
      water: this.getWater(),
      connected: this.getConnected()
    };

    return attr;
  }
});
