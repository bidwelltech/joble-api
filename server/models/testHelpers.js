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

const matchContentType = contentType => ({
  description: `should respond with Content-Type ${contentType}`,
  test: (response) => {
    expect(response.headers['content-type'])
      .to.match(contentType);
  },
});

const haveStatusCode = statusCodes => ({
  description: (Array.isArray(statusCodes)) ?
    `should respond with on of ${statusCodes}` : `should respond with ${statusCodes}`,
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

const generateHTTPVerbs = server => ({
  get: { name: 'GET', fn: server.get },
  put: { name: 'PUT', fn: server.put },
  patch: { name: 'PATCH', fn: server.patch },
  delete: { name: 'DELETE', fn: server.delete },
  post: { name: 'POST', fn: server.post },
});

// shouldBe
const disabled = (origConfig, userData) => {
  const config = Object.assign({}, origConfig);

  describe('anonymous', () => {
    config.token = null;

    itShould(haveStatusCode([404, 500]), config);
    itShould(matchContentType(/.*json.*/), config);
  });
  describe('authenticated', () => {
    config.token = userData.authenticated.token;

    itShould(haveStatusCode([404, 500]), config);
    itShould(matchContentType(/.*json.*/), config);
  });
  describe('admin', () => {
    config.token = userData.admin.token;

    itShould(haveStatusCode([404, 500]), config);
    itShould(matchContentType(/.*json.*/), config);
  });
};

// shouldBe
const accessibleBy = (name, origConfig, userData) => {
  const config = Object.assign({}, origConfig);

  describe(name, () => {
    config.token = userData.token;
    itShould(notHaveStatusCodes([401, 404]), config);
    itShould(matchContentType(/.*json.*/), config);
  });
};

// shouldBe
const inaccesibleBy = (name, origConfig, userData) => {
  const config = Object.assign({}, origConfig);

  describe(name, () => {
    config.token = userData.token;
    itShould(haveStatusCode(401), config);
    itShould(matchContentType(/.*json.*/), config);
  });
};


module.exports = {
  generateHTTPVerbs,
  notHaveStatusCodes,
  haveStatusCode,
  itShould,
  matchContentType,
  shouldBe: {
    accessibleBy,
    disabled,
    inaccesibleBy,
  },
};
