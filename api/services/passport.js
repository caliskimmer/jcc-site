const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const User = require('mongoose').model('User');
const log = require('../logger');

// TODO: handle successful and unsuccessful login and refactor
module.exports = function (app) {
  log.info('api.services.passport: creating passport local behavior');

  let opts = {
    passReqToCallback: true,
    session: false,
  };
  passport.use(
    new LocalStrategy(opts, async (req, username, password, done) => {
      if (req.headers.authorization) {
        try {
          let user = jwt.decode(
            req.headers.authorization.split(' ')[1],
            process.env.JWT_SECRET,
          );
          return done(null, user);
        } catch (err) {
          log.error(`An error occurred decoding jwt => ${err}`);
          return done(err, false);
        }
      }

      try {
        var obj = await User.findOne({ username: username }).exec();
      } catch (err) {
        log.error(
          `An error occurred retrieving user from database => ${err}`,
        );
        return done(err, false);
      }
      if (!obj) {
        return done(null, false);
      }

      try {
        var hashesMatch = await bcrypt.compare(
          password,
          obj['password'],
        );
      } catch (err) {
        log.error(`An error occurred comparing hashes => ${err}`);
        return done(err, false);
      }
      if (!hashesMatch) {
        return done(null, false);
      }

      let user = {
        username: username,
        firstName: obj['firstName'],
        lastName: obj['lastName'],
        id: obj['_id'],
        role: obj['role'],
      };
      let payload = {
        id: obj['_id'],
        iat: Date.now() / 1000,
        exp: Date.now() / 1000 + 5 * 60 * 60,
      };
      let token = jwt.encode(payload, process.env.JWT_SECRET);
      user['token'] = token;

      return done(null, user);
    }),
  );

  // secure route authentication
  opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      return done(null, jwt_payload);
    }),
  );

  app.use(passport.initialize());
};
