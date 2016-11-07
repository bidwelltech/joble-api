// Override config.json values for test

module.exports = {
  port: 3002,
  remoting: {
    // ref: https://gist.github.com/pulkitsinghal/82e659ca4b56bc1b4b2c
    // ref: https://docs.strongloop.com/display/public/LB/Environment-specific+configuration#Environment-specificconfiguration-CustomizingRESTerrorhandling
    // ref: https://github.com/strongloop/strong-error-handler
    errorHandler: {
      debug: false,
      log: false,
    },
  },
};
