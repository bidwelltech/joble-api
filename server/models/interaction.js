'use strict';

module.exports = function(Interaction) {
  Interaction.validatesPresenceOf(['type']);
  Interaction.validatesInclusionOf('type', {
    in: ['communication', 'interview', 'other'],
  });
};
