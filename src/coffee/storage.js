import Storage from 'backbone.storage';
import Model from './model';
import Collection from './collection';

var CoffeeStorage = Storage.extend({
  model: Model,
  collection: Collection
});

export default new CoffeeStorage();
