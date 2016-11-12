/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const request = require('supertest-as-promised');
const generateHTTPVerbs = require('./testHelpers').generateHTTPVerbs;
const shouldBe = require('./testHelpers').shouldBe;
// const itShould = require('./testHelpers').itShould;
// const matchContentType = require('./testHelpers').matchContentType;
// const haveStatusCode = require('./testHelpers').haveStatusCode;
const app = require('../server');

const api = request(app);
const apiUrlPrefix = '/api';
const verbs = generateHTTPVerbs(api);

const validModelData = {
  description: 'This is an example',
  startDate: Date.now(),
  type: 'communication',
  notes: 'These are notes',
};

const modelPlural = 'interactions';
// const modelSingular = 'interaction';


const describeTests = (userData) => {
  const config = { request: '', path: '', token: '' };

  let verb;
  let instanceId;

  describe('Interactions', () => {
    beforeEach((done) => {
      const { id, token } = userData.authenticated;

      api
        .post(`${apiUrlPrefix}/users/${id}/${modelPlural}`)
        .send(validModelData)
        .set('Authorization', token)
        .expect(200)
        .then((response) => {
          instanceId = response.body.id;
          done();
        });
    });

    afterEach((done) => {
      const { id, token } = userData.authenticated;

      api
        .delete(`${apiUrlPrefix}/users/${id}/${modelPlural}/${instanceId}`)
        .set('Authorization', token)
        .expect(204, done);
    });

    describe('endpoints', () => {
      describe('patchOrCreate', () => {
        verb = verbs.patch;
        config.path = `${apiUrlPrefix}/${modelPlural}`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.disabled(config, userData);
        });
      });
      describe('find', () => {
        verb = verbs.get;
        config.path = `${apiUrlPrefix}/${modelPlural}`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccesibleBy('anonymous', config, userData.anonymous);
          shouldBe.inaccesibleBy('authenticated', config, userData.authenticated);
          shouldBe.accessibleBy('admin', config, userData.admin);
        });
      });
      describe('replaceOrCreate', () => {
        verb = verbs.put;
        config.path = `${apiUrlPrefix}/${modelPlural}`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.disabled(config, userData);
        });
      });
      describe('create', () => {
        verb = verbs.post;
        config.path = `${apiUrlPrefix}/${modelPlural}`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.disabled(config, userData);
        });
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
  admin: {},
  anonymous: { id: null, token: null },
  authenticated: {},
};

api
  .post(`${apiUrlPrefix}/users/login`)
  .send(userCredentials.admin)
  .expect(200)
  .then((response) => {
    userData.admin.token = response.body.id;
    userData.admin.id = response.body.userId;

    return api
      .post(`${apiUrlPrefix}/users/login`)
      .send(userCredentials.authenticated)
      .expect(200);
  })
  .then((response) => {
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

