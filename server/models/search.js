'use strict';

module.exports = function(Search) {
  Search.validatesPresenseOf(['title', 'status']);
  Search.validatesInclusionOf('status', {
    in: ['open', 'closed']
  });
};
