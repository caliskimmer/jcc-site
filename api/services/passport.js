const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const User = require('mongoose').model('User');
const log = require('../logger');

// TODO: handle successful and unsuccessful login and refactor
module.exports = function(app) {
    log.info('api.services.passport: creating passport local behavior');

    let opts = {
        passReqToCallback: true,
        session: false
    };
    passport.use(new LocalStrategy(opts, (req, username, password, done) => {
        log.debug('api.services.passport.local: retrieving username from database');

        log.info('api.services.passport.local: checking if user already authenticated');
        let authHeader = req.headers.authorization;
        if (authHeader) {
            log.debug('api.services.passport.local: auth header exists, checking for token');

            try {
                let user = jwt.decode(authHeader.split(" ")[1], process.env.JWT_SECRET);

                log.debug('api.services.passport.local: user already authenticated. No need to login.');
                return done(null, user);
            } catch(err) {
                log.debug('decode failed, need to authenticate user');
            }
        }

        log.info('api.services.passport.local: no authenticated user, retrieving from db...');
        User.findOne({'username': username}, (err, obj) => {
            if (!obj) {
                log.debug('api.services.passport.local: user was not found');
                done(null, false, { message: 'Unable to login' });
            }

            log.debug('api.services.passport.local: comparing password hashes');
            bcrypt.compare(password, obj['password']).then(function(res) {
                if (res) {
                    log.info(`api.services.passport.local: ${username} login successful`);
                    let user = {
                        'username':  username,
                        'firstName': obj['firstName'],
                        'lastName':  obj['lastName'],
                        'id':        obj['_id'],
                        'roles':     obj['roles']
                    };
                    let payload = {
                        'id':       obj['_id'],
                        'iat':      Date.now() / 1000,
                        'exp':      Date.now() / 1000 + 5 * 60 * 60
                    };
                    let token = jwt.encode(payload, process.env.JWT_SECRET);
                    user['token'] = token;

                    return done(null, user);
                }

                log.info('api.services.passport.local: login failed');
                return done(null, false, {message:'Username and/or password is incorrect'});

            }, function(err) {
                log.info('api.services.passport.local: an error occurred');
                if (err) {
                    log.error(`api.services.passport.local: ${err}`);
                    return done(null, false, {message:'An error occurred during login'});
                }
            });
        });
    }));

    // secure route authentication
    log.info('api.services.passport: creating passport jwt behavior');
    opts = {
        'jwtFromRequest': ExtractJwt.fromAuthHeaderAsBearerToken(),
        'secretOrKey':    process.env.JWT_SECRET
    };
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        log.debug(`api.services.passport.jwt: retrieving user from payload: ${JSON.stringify(jwt_payload)}`);

        return done(null, jwt_payload);
    }));

    app.use(passport.initialize());
};
