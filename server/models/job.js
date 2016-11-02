'use strict';

module.exports = function(Job) {
  Job.validatesPresenceOf(['title', 'status']);
  Job.validatesInclusionOf('status', {
    in: ['open', 'closed'],
  });
};
