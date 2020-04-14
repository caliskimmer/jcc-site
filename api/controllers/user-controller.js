const User = require('mongoose').model('User');
const UserService = require('../services/user')();
const debug = require('debug')('user-controller');

module.exports = function () {
  let UserController = {};

  UserController.listUsers = async function (req, res) {
    let user = await getUser(res, req.user.id);

    if (user.role === User.roleMap.USER) {
      return res.status(403).json({
        success: false,
        users: null,
        reason:
          'user of role "user" does not have permission to view users',
      });
    }

    try {
      return res.json({
        success: true,
        users: await User.listFromDatabase(user.role),
        reason: null,
      });
    } catch (err) {
      log.error(
        `An error occurred listing users from database => ${err}`,
      );
      return res.json({
        success: false,
        users: null,
        reason: 'an internal error occurred',
      });
    }
  };

  UserController.viewUser = async function (req, res) {
    try {
      var user = await User.viewFromDatabase(req.user.id);
    } catch (err) {
      log.error(
        `An error occurred getting user from database => ${err}`,
      );
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }

    let userToView = await getUser(res, req.params.id);

    if (
      user.role === User.roleMap.USER &&
      user.username !== userToView.username
    ) {
      return res.status(403).json({
        success: false,
        reason:
          'user of role "user" does not have permission to view this user',
      });
    }

    if (
      user.role === User.roleMap.ADMIN &&
      userToView.role === User.roleMap.SUPERADMIN
    ) {
      return res.status(403).json({
        success: false,
        reason:
          'user of role "admin" does not have permission to view this user',
      });
    }

    return res.json({
      success: true,
      user: userToView,
      reason: null,
    });
  };

  UserController.updateUser = async function (req, res) {
    let user = await getUser(res, req.user.id);
    let userToUpdate = await getUser(res, req.params.id);

    if (user.role !== User.roleMap.SUPERADMIN && req.body.role) {
      return res.status(403).json({
        success: false,
        reason: 'user does not have permission to update role',
      });
    }

    if (
      user.role === User.roleMap.USER &&
      user.username !== userToUpdate.username
    ) {
      return res.status(403).json({
        success: false,
        reason: 'user of role "user" can only update own information',
      });
    }

    if (
      user.role === User.roleMap.ADMIN &&
      userToUpdate.role !== User.roleMap.USER
    ) {
      return res.status(403).json({
        success: false,
        reason:
          'user of role "admin" can only update users of role "user"',
      });
    }

    if (
      req.body.password &&
      user.username !== userToUpdate.username
    ) {
      return res.status(403).json({
        success: false,
        reason: 'user can only update their own password',
      });
    }

    if (req.body.firstName) {
      userToUpdate.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      userToUpdate.lastName = req.body.lastName;
    }
    if (req.body.password) {
      userToUpdate.password = await UserService.generatePasswordHash(
        req.body.password,
      );
    }
    if (req.body.role && user.role === User.roleMap.SUPERADMIN) {
      userToUpdate.role = req.body.role;
    }

    try {
      await userToUpdate.save().exec();
      return res.json({
        success: true,
        reason: null,
      });
    } catch (err) {
      log.error(`An error occurred checking updating user => ${err}`);
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }
  };

  UserController.deleteUser = async function (req, res) {
    let user = await getUser(res, req.user.id);
    let userToDelete = await getUser(res, req.params.id);

    if (user.username === userToDelete.username) {
      return res.status(403).json({
        success: false,
        reason: 'user cannot delete themselves',
      });
    }

    if (user.role === User.roleMap.USER) {
      return res.status(403).json({
        success: false,
        reason:
          'user of role "user" does not have permission to delete users',
      });
    }

    if (
      user.role === User.roleMap.ADMIN &&
      userToDelete.role !== User.roleMap.USER
    ) {
      return res.status(403).json({
        success: false,
        reason:
          'user of role "admin" can only delete users of role "user"',
      });
    }

    try {
      await userToDelete.deleteFromDatabase();
      return res.json({
        success: true,
        reason: null,
      });
    } catch {
      log.error(
        `An error occurred deleting user from database => ${err}`,
      );
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }
  };

  UserController.createUser = async function (req, res) {
    let user = await getUser(res, req.user.id);

    if (user.role === User.roleMap.USER) {
      return res.status(403).json({
        success: false,
        reason: 'user does not have permission to create a user',
      });
    }

    let errors = [];
    if (!req.body.username) {
      errors.push('username is missing');
    }
    if (!req.body.password) {
      errors.push('password is missing');
    }
    if (!req.body.role) {
      errors.push('role type is missing');
    }
    if (errors.length > 0) {
      return res.json({
        success: false,
        reason: errors,
      });
    }

    if (
      user.role < User.roleMap.SUPERADMIN &&
      user.role >= req.body.role
    ) {
      return res.status(403).json({
        success: false,
        reason: `user does not have permission to create a user of role ${User.getRoleFromNumber(
          req.body.role,
        )}`,
      });
    }

    let newUser = new User({
      username: req.body.username,
      password: await UserService.generatePasswordHash(
        req.body.password,
      ),
      role: req.body.role,
    });

    if (req.body.title) {
      newUser.title = req.body.title;
    }
    if (req.body.firstName) {
      newUser.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      newUser.lastName = req.body.lastName;
    }

    try {
      var userExists = await User.findOne({
        username: req.body.username,
      }).exec();
      if (userExists) {
        return res.json({
          success: false,
          reason: 'user already exists in database',
        });
      }
    } catch (err) {
      log.error(
        `An error occurred checking for duplicate users => ${err}`,
      );
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }

    try {
      await newUser.save().exec();
    } catch (err) {
      log.error(
        `An error occurred saving new user to database => ${err}`,
      );
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }

    return res.json({
      success: true,
      reason: null,
    });
  };

  let getUser = async function (res, id) {
    try {
      var user = await User.retrieveFromDatabase(id);
    } catch (err) {
      log.error(
        `An error occurred retrieving user from database => ${err}`,
      );

      //TODO throw error and then catch in endpoint method
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }

    return user;
  };

  return UserController;
};
