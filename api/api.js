var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var api = module.exports = express();

api.use(logger('dev'));
api.use(bodyParser.json());
api.use(session({
  secret: 'secret_simple_for_coffee',
  resave: true,
  saveUninitialized: false
}));

require('./coffee/routes')(api);
require('./nest/routes')(api);

module.exports = api;
