// Override config.json values for development
// const debug = require('debug');

module.exports = {
  port: 3001,
  remoting: {
    // ref: https://gist.github.com/pulkitsinghal/82e659ca4b56bc1b4b2c
    // ref: https://docs.strongloop.com/display/public/LB/Environment-specific+configuration#Environment-specificconfiguration-CustomizingRESTerrorhandling
    // ref: https://github.com/strongloop/strong-error-handler
    errorHandler: {
      debug: false,
      handler: (err, req, res, next) => {
        // custom error handling logic
        // const log = debug('server:rest:errorHandler'); // example
        // log(req.method, req.originalUrl, res.statusCode, err);
        next(); // call next() to fall back to the default error handler
      },
    },
  },
};
