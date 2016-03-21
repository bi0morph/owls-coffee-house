import './plugins';
import Backbone from 'backbone';
import $ from 'jquery';

import Application from './application/application';

import ModalService from './modal/service';
import HeaderService from './header/service';
import FlashesService from './flashes/service';
import CoffeePotService from './coffee-pot/service';

import IndexRouter from './index/router';
import CoffeeRouter from './coffee/router';

let app = new Application();

ModalService.setup({
  container: app.layout.overlay
});

HeaderService.setup({
  container: app.layout.header
});

FlashesService.setup({
  container: app.layout.flashes
});
CoffeePotService.setup();

$(document).ajaxError(() => {
  FlashesService.add({
    type: 'danger',
    title: 'Server Error'
  });
});

app.index = new IndexRouter({
  container: app.layout.content
});

app.coffee = new CoffeeRouter({
  container: app.layout.content
});

Backbone.history.start();
