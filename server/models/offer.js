'use strict';

module.exports = function(Offer) {
  Offer.validatesPresenceOf(['givenDate', 'status']);
  Offer.validatesInclusionOf('status', {
    in: ['accepted', 'rejected', 'undecided'],
  });
};
