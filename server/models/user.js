const apiConfig = require('../../api-config');
const disableAllMethodsWithExceptions = require('../helpers').disableAllMethodsWithExceptions;

module.exports = (User) => {
  // Validation is handled by the User model this inherits from.

  // Only expose intended endpoints
  disableAllMethodsWithExceptions(User, apiConfig.user.enabledMethods);
};
