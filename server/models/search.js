'use strict';
const apiConfig = require('../../api-config');
const disableAllMethodsWithExceptions = require('../helpers').disableAllMethodsWithExceptions;

module.exports = function(Search) {
  // Validation
  Search.validatesPresenceOf(['title', 'status']);
  Search.validatesInclusionOf('status', {
    in: ['open', 'closed'],
  });

  // Only expose intended endpoints
  disableAllMethodsWithExceptions(Search, apiConfig.search.enabledMethods);
};
