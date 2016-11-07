'use strict';
const apiConfig = require('../../api-config');
const disableAllMethodsWithExceptions = require('../helpers').disableAllMethodsWithExceptions;

module.exports = function(User) {
  // Validation is handled by the User model this inherits from.

  // Only expose intended endpoints
  disableAllMethodsWithExceptions(User, apiConfig.user.enabledMethods);
};
