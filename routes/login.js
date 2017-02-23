var express = require('express');
var authHelper = require('../server/middleware/authenticationHelper');
var helper = require('../server/middleware/responseHelper');
var login = express.Router();


// GET /login/:provider
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
login.get('/login/:provider',
						authHelper.providerAuthentication);

// GET /login/:provider/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

login.get('/login/:provider/callback',
                        authHelper.providerAuthenticationCb);

login.get('/logout',
                     authHelper.logout);

module.exports = login;