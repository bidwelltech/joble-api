const apiConfig = require('../../api-config');
const disableAllMethodsWithExceptions = require('../helpers').disableAllMethodsWithExceptions;

module.exports = (Job) => {
  // Validation
  Job.validatesPresenceOf(['title', 'status']);
  Job.validatesInclusionOf('status', {
    in: ['open', 'closed'],
  });

  // Only expose intended endpoints
  disableAllMethodsWithExceptions(Job, apiConfig.job.enabledMethods);
};
