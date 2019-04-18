const passport = require('passport');
const log = require('../logger');

module.exports = function() {
    let auth = {};

    auth.login = function(req, res, next) {
        passport.authenticate('local', function(err, user) {
            log.trace('api.services.auth.login: begun');

            if (err) {
                log.info(`api.services.auth.login: an error occurred => ${err}`);
                res.status(404).json({user: null, success: false});
                return next({
                    type: 'authorization',
                    error: err
                });
            }

            if (!user) {
                log.info('api.services.auth.login: login failed');
                return res.status(403).json({user: null, success: false});
            }

            log.info('api.services.auth.login: login was successful');
            return res.json({user: user, success: true});
        })(req, res, next);
    };

    auth.authenticate = function(req, res, next) {
        log.debug('api.services.auth.authenticate: checking for jwt token');
        passport.authenticate('jwt', { session: false }, function(err, user) {
            if (user) {
                log.debug('api.services.auth.authenticate: user already logged in');
                req.user = user;

                return next();
            } else {
                log.debug('api.services.auth.authenticate: user is NOT authenticated');
                return res.status(401).json({user: null, success: false});
            }
        })(req, res, next);
    };

    return auth;
};
