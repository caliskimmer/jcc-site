const bcrypt = require('bcrypt');

module.exports = function() {
  let UserService = {};

  UserService.generatePasswordHash = async function(password) {
    return await bcrypt.hash(password, 10);
  };

  return UserService;
};
