const passport = require('passport');
const debug = require('debug')('auth');

module.exports = function () {
  let auth = {};

  auth.login = function (req, res) {
    passport.authenticate('local', function (err, user) {
      if (err) {
        log.error(`An error occurred logging in user => ${err}`);
        return res.json({
          user: null,
          success: false,
          reason: 'An internal error occurred',
        });
      }

      if (!user) {
        return res.status(403).json({ user: null, success: false });
      }

      return res.json({ user: user, success: true });
    })(req, res);
  };

  auth.authenticate = function (req, res) {
    passport.authenticate('jwt', { session: false }, function (
      err,
      user,
    ) {
      if (err) {
        log.error(`An error occurred authenticating user => ${err}`);
        res.json({
          user: null,
          success: false,
          reason: 'An internal error occurred',
        });
      }

      if (!user) {
        return res.status(401).json({ user: null, success: false });
      }

      req.user = user;

      return next();
    })(req, res);
  };

  return auth;
};
