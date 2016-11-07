const apiConfig = require('../../api-config');
const disableAllMethodsWithExceptions = require('../helpers').disableAllMethodsWithExceptions;

module.exports = (Offer) => {
  // Validation
  Offer.validatesPresenceOf(['givenDate', 'status']);
  Offer.validatesInclusionOf('status', {
    in: ['accepted', 'rejected', 'undecided'],
  });

  // Only expose intended endpoints
  disableAllMethodsWithExceptions(Offer, apiConfig.offer.enabledMethods);
};
