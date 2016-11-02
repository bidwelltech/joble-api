'use strict';

module.exports = function(Offer) {
  Offer.validatesPresenceOf(['givenDate']);
};
