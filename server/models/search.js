'use strict';

module.exports = function(Search) {
  Search.validatesPresenceOf(['title', 'status']);
  Search.validatesInclusionOf('status', {
    in: ['open', 'closed'],
  });
};
