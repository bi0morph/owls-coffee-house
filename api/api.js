var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var api = module.exports = express();

api.use(logger('dev'));
api.use(bodyParser.json());
api.use(session({
  secret: 'secret_simple_for_coffee', // Change for production apps
  resave: true,
  saveUninitialized: false
}));

require('./books/routes')(api);
require('./colors/routes')(api);
require('./coffee/routes')(api);
require('./nest/routes')(api);

module.exports = api;
