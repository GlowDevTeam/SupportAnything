// config/passport.js

// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new FacebookStrategy({
    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL
  },
  // facebook will send back the token and profile
  function(token, refreshToken, profile, done) {
    var user = {
      'id'   : profile.id,
      'name' : profile.name.givenName + ' ' + profile.name.familyName,
      'token': token,
      'profilePicture': "https://graph.facebook.com/"+profile.id+"/picture?access_token="+token+"&width=768&height=768",
      'localProfilePicture': null
    }  
    return done(null, user);
  }));

};
