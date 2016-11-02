'use strict';

module.exports = function(Job) {
  Job.validatesInclusionOf('status', {
    in: ['open', 'closed']
  });
};
