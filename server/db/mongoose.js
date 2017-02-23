'use strict';

var config = require('config');
var mongoose = require('mongoose');

mongoose.connect(config.mongoUrl);

module.exports = mongoose;
