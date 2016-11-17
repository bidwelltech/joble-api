const expect = require('chai').expect;

const itShould = (expectation, config, dataToSend, done) => {
  const request = config.request(config.path);
  if (config.token) {
    request.set('Authorization', config.token);
  }
  // console.log('config', config);
  if (dataToSend !== null) {
    // console.log('dataToSend', dataToSend);
    request.send(dataToSend);
  }
  request.end((err, response) => {
    if (err) {
      return done(err);
    }

    expectation.test(response);
    return done();
  });
};

const _matchContentType = contentTypeRegex => ({
  description: `should respond with Content-Type ${contentTypeRegex}`,
  test: (response) => {
    expect(response.headers['content-type'])
      .to.match(contentTypeRegex);
  },
});

const _matchStatusCode = statusCodeRegex => ({
  description: `should respond with ${statusCodeRegex}`,
  test: (response) => {
    expect(response.status)
      .to.match(statusCodeRegex);
  },
});

const generateHTTPVerbs = server => ({
  get: { name: 'GET', fn: server.get },
  put: { name: 'PUT', fn: server.put },
  patch: { name: 'PATCH', fn: server.patch },
  delete: { name: 'DELETE', fn: server.delete },
  post: { name: 'POST', fn: server.post },
});

// shouldBe
const beDisabled = 'should be disabled';
const beDisabledFor = (userData, origConfig, done) => {
  const config = Object.assign({}, origConfig);

  config.token = userData.token;

  itShould(_matchStatusCode(/(404|500)/), config, null, done);
};

// should
const beAccessible = 'should be accessible';
const beAccessibleBy = (userData, origConfig, dataToSend, done) => {
  const config = Object.assign({}, origConfig);

  config.token = userData.token;
  itShould(_matchStatusCode(/2\d{2}/), config, dataToSend, done);
};

// should
const beInaccessible = 'should be inaccessible';
const beInaccessibleBy = (userData, origConfig, done) => {
  const config = Object.assign({}, origConfig);

  config.token = userData.token;
  itShould(_matchStatusCode(/401/), config, null, done);
};

// should
const haveJSONContentType = 'should have Content-Type of application/json';
const matchContentType = (contentTypeRegex, userData, origConfig, done) => {
  const config = Object.assign({}, origConfig);

  config.token = userData.token;
  itShould(_matchContentType(contentTypeRegex), config, null, done);
};

// should
const matchStatusCode = (statusCodeRegex, userData, origConfig, done) => {
  const config = Object.assign({}, origConfig);

  config.token = userData.token;
  itShould(_matchStatusCode(statusCodeRegex), config, null, done);
};

module.exports = {
  generateHTTPVerbs,
  itShould,
  matchContentType,
  matchStatusCode,
  should: {
    beAccessible,
    beAccessibleBy,

    beDisabled,
    beDisabledFor,

    beInaccessible,
    beInaccessibleBy,

    matchStatusCode,

    haveJSONContentType,
    matchContentType,
  },
};
