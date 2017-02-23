//var jwt = require('jwt-simple');
var config = require('config');
var helper = require('./responseHelper');
var promise = require('q');
var bcrypt = require('bcryptjs');
var passport =require('../util/passport');
var debug = require('debug')('middleware:authenticationhelper');

module.exports = {

	providerAuthentication: function(req, res, next) {
    var provider = req.params.provider;
    console.log('providerAuthentication RECEIVE PROVIDER===='+ provider);
    var opts;
    if (!provider) {
        return next();
    }
    opts = config[provider + 'Strategy'].authenticateOptions;
    passport.authenticate(provider, opts)(req, res, next);
    },

    providerAuthenticationCb : [
    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    function(req, res, next) {
        var provider = req.params.provider;
        console.log("providerAuthenticationCb");
        if (!provider) {
            return next();
        }
        passport.authenticate(provider, {
            successRedirect: '/home',
            failureRedirect: '#/',
            failureFlash: true
        })(req, res, next);
    }
  ],

  logout : function(req, res, next) {
    // cookie = req.cookies;
    // for (var prop in cookie) {
    //     if (!cookie.hasOwnProperty(prop)) {
    //         continue;
    //     }    
    //     res.cookie(prop, '', {expires: new Date(0)});
    // }
    req.session.destroy(function(err) {
        if (err) {
            return next(err);
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
}
}