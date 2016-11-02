'use strict';

module.exports = function(Interaction) {
  Interaction.validatesPresenceOf(['type', 'startDate']);
  Interaction.validatesInclusionOf('type', {
    in: ['communication', 'interview', 'other'],
  });
};
