'use strict';

module.exports = function(Interaction) {
  Interaction.validatesPresenseOf(['type']);
  Interaction.validatesInclusionOf('type', {
    in: ['communication', 'interview', 'other'],
  });
};
