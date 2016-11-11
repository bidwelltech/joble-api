/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const request = require('supertest-as-promised');

const app = require('../server');

const api = request(app);
const apiUrlPrefix = '/api';

const modelPlural = 'interactions';
// const modelSingular = 'interaction';

const methods = {
  get: { name: 'GET', fn: api.get },
  put: { name: 'PUT', fn: api.put },
  patch: { name: 'PATCH', fn: api.patch },
  delete: { name: 'DELETE', fn: api.delete },
  post: { name: 'POST', fn: api.post },
};

const itShould = (expectation, config) => {
  it(expectation.description, (done) => {
    if (config.token) {
      config.request(config.path)
        .set('Authorization', config.token)
        .end((err, response), () => {
          if (err) return done(err);

          expectation.test(response);
          return done();
        });
    } else {
      config.request(config.path)
        .set('Authorization', config.token)
        .end((err, response), () => {
          if (err) return done(err);

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

const haveStatusCode = statusCode => ({
  description: `should respond with ${statusCode}`,
  test: (response) => {
    expect(response.status)
      .to.equal(statusCode);
  },
});


const describeTests = (userData) => {
  const config = { request: '', path: '', token: '' };

  let path;
  let method;

  describe('Interactions', () => {
    beforeEach((done) => {
      done();
    });

    afterEach((done) => {
      done();
    });

    describe('endpoints', () => {
      describe('patchOrCreate', () => {
        method = methods.patch;
        config.path = `${apiUrlPrefix}/${modelPlural}`;
        config.request = api.patch;

        describe(`${method.name} ${config.path}`, () => {
          describe('anonymous', () => {
            config.token = null;

            itShould(haveStatusCode(404), config);
            itShould(matchContentType(/.*json.*/), config);
          });
          describe('authenticated', () => {
            config.token = userData.authenticated.token;

            itShould(haveStatusCode(404), config);
            itShould(matchContentType(/.*json.*/), config);
          });
          describe('admin', () => {
            config.token = userData.admin.token;

            itShould(haveStatusCode(404), config);
            itShould(matchContentType(/.*json.*/), config);
          });
        });
      });
      describe('find', () => {
        // path: `/${modelPlural}`,
        // method: methods.get,
      });
      describe('replaceOrCreate', () => {
        // path: `/${modelPlural}`,
        // method: methods.put,
      });
      describe('create', () => {
        // path: `/${modelPlural}`,
        // method: methods.post,
      });

      describe('patchAttributes', () => {
        // path: id => `/${modelPlural}/${id}`,
        // method: methods.patch,
      });
      describe('findById', () => {
        // path: id => `/${modelPlural}/${id}`,
        // method: methods.get,
      });
      describe('replaceById', () => {
        // path: id => `/${modelPlural}/${id}`,
        // method: methods.put,
      });
      describe('deleteById', () => {
        // path: id => `/${modelPlural}/${id}`,
        // method: methods.delete,
      });

      describe('exists', () => {
        // path: id => `/${modelPlural}/${id}/exists`,
        // method: methods.get,
      });
      describe('replaceById', () => {
        // path: id => `/${modelPlural}/${id}/replace`,
        // method: methods.post,
      });
      describe('createChangeStream', () => {
        // path: `/${modelPlural}/change-stream`,
        // method: methods.get,
        // path: `/${modelPlural}/change-stream`,
        // method: methods.post,
      });
      describe('count', () => {
        // path: `/${modelPlural}/count`,
        // method: methods.get,
      });
      describe('findOne', () => {
        // path: `/${modelPlural}/findOne`,
        // method: methods.get,
      });
      describe('replaceOrCreate', () => {
        // path: `/${modelPlural}/replaceOrCreate`,
        // method: methods.put,
      });
      describe('updateAll', () => {
        // path: `/${modelPlural}/update`,
        // method: methods.post,
      });
      describe('upsertWithWhere', () => {
        // path: `/${modelPlural}/upsertWithWhere`,
        // method: methods.post,
      });
    });
  });
};


const userCredentials = {
  authenticated: {
    username: 'testuser',
    password: 'testuser',
  },
  admin: {
    username: 'testadmin',
    password: 'testadmin',
  },
};

const userData = {
  authenticated: {},
  admin: {},
};

api
  .post(`${apiUrlPrefix}/users/login`)
  .send(userCredentials.admin)
  .expect(200)
  .then((response) => {
    console.log('1');
    userData.admin.token = response.body.id;
    userData.admin.id = response.body.userId;

    return api
      .post(`${apiUrlPrefix}/users/login`)
      .send(userCredentials.authenticated)
      .expect(200);
  })
  .then((response) => {
    console.log('2');
    userData.authenticated.token = response.body.id;
    userData.authenticated.id = response.body.userId;

    // Available thanks to the --delay flag
    // ref: https://github.com/mochajs/mocha/issues/2257#issuecomment-219313311
    describeTests(userData);

    // eslint's mocha env doesn't include `run`, so disable the no-undef test
    // eslint-disable-next-line no-undef
    run();
  })
  .catch(err => console.error(err));

