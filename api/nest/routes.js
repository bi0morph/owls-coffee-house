var clientKey = require('./client-key'),
  passport = require('passport'),
  NestStrategy = require('passport-nest').Strategy;

module.exports = function(api) {

  passport.use(new NestStrategy({
      clientID: clientKey.NEST_ID,
      clientSecret: clientKey.NEST_SECRET
    }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  api.use(passport.initialize());
  api.use(passport.session());

  api.get('/nest/', passport.authenticate('nest'));
  api.get('/nest/callback', passport.authenticate('nest', { }), function(req, res) {
    res.cookie('nest_token', req.user.accessToken);
    res.redirect('/#/coffee');
  });
};
