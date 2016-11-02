'use strict';

module.exports = function(Job) {
  Job.validatesPresenseOf(['title', 'status']);
  Job.validatesInclusionOf('status', {
    in: ['open', 'closed']
  });
};
