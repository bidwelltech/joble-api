const expect = require('chai').expect;

const itShould = (expectation, config) => {
  it(expectation.description, (done) => {
    if (config.token) {
      config.request(config.path)
        .set('Authorization', config.token)
        .end((err, response) => {
          if (err) {
            return done(err);
          }

          expectation.test(response);
          return done();
        });
    } else {
      config.request(config.path)
        .end((err, response) => {
          if (err) {
            return done(err);
          }

          expectation.test(response);
          return done();
        });
    }
  });
};

const matchContentType = contentTypeRegex => ({
  description: `should respond with Content-Type ${contentTypeRegex}`,
  test: (response) => {
    expect(response.headers['content-type'])
      .to.match(contentTypeRegex);
  },
});

const matchStatusCode = statusCodeRegex => ({
  description: `should respond with ${statusCodeRegex}`,
  test: (response) => {
    expect(response.status)
      .to.match(statusCodeRegex);
  },
});

  /*
const haveStatusCode = statusCodes => ({
  description: (Array.isArray(statusCodes)) ?
    `should respond with one of [${statusCodes.join(', ')}]` : `should respond with ${statusCodes}`,
  test: (response) => {
    if (Array.isArray(statusCodes)) {
      // Test against multiple status codes
      expect(statusCodes)
        .to.contain(response.status);
    } else {
      // Test against a single status codes
      expect(statusCodes)
        .to.equal(response.status);
    }
  },
});

const notHaveStatusCodes = statusCodes => ({
  description: `should not respond with ${statusCodes.join(' or ')}`,
  test: (response) => {
    expect(statusCodes)
      .to.not.contain(response.status);
  },
});
*/

const generateHTTPVerbs = server => ({
  get: { name: 'GET', fn: server.get },
  put: { name: 'PUT', fn: server.put },
  patch: { name: 'PATCH', fn: server.patch },
  delete: { name: 'DELETE', fn: server.delete },
  post: { name: 'POST', fn: server.post },
});

// shouldBe
const disabled = (userData, origConfig) => {
  const config = Object.assign({}, origConfig);

  Object.keys(userData).forEach((key) => {
    describe(userData[key].name, () => {
      config.token = userData[key].token;

      itShould(matchStatusCode(/(404|500)/), config);
      itShould(matchContentType(/.*json.*/), config);
    });
  });
};

// shouldBe
const accessibleBy = (userData, origConfig) => {
  const config = Object.assign({}, origConfig);

  describe(userData.name, () => {
    config.token = userData.token;
    itShould(matchStatusCode(/2\d{2}/), config);
    itShould(matchContentType(/.*json.*/), config);
  });
};

// shouldBe
const inaccessibleBy = (userData, origConfig) => {
  const config = Object.assign({}, origConfig);

  describe(userData.name, () => {
    config.token = userData.token;
    itShould(matchStatusCode(/401/), config);
    itShould(matchContentType(/.*json.*/), config);
  });
};


module.exports = {
  generateHTTPVerbs,
  itShould,
  matchContentType,
  matchStatusCode,
  shouldBe: {
    accessibleBy,
    disabled,
    inaccessibleBy,
  },
};
