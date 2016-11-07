const apiConfig = require('../../api-config');
const disableAllMethodsWithExceptions = require('../helpers').disableAllMethodsWithExceptions;

module.exports = (Interaction) => {
  // Validation
  Interaction.validatesPresenceOf(['type', 'startDate']);
  Interaction.validatesInclusionOf('type', {
    in: ['communication', 'interview', 'other'],
  });

  // Only expose intended endpoints
  disableAllMethodsWithExceptions(Interaction, apiConfig.interaction.enabledMethods);
};

