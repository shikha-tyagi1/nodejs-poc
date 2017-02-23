var express = require('express');
var userController = require('../server/controllers/userCtrl');
var authHelper = require('../server/middleware/authenticationHelper');
var helper = require('../server/middleware/responseHelper');
var router = express.Router();

router.get('/', function(req, res) {
  	res.render('home', {
    user: req.user
  	});
});

module.exports = router;