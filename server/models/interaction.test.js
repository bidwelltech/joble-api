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


const modelPlural = 'interactions';
// const modelSingular = 'interaction';


const describeTests = (userData) => {
  const config = { request: '', path: '', token: '' };

  let verb;
  let instanceId;

  describe('Interactions', () => {
    beforeEach((done) => {
      const { userId, token } = userData.owner;

      const validModelData = {
        userId,
        description: 'This is an example',
        startDate: Date.now(),
        type: 'communication',
        notes: 'These are notes',
      };

      api
        .post(`${apiUrlPrefix}/${modelPlural}`)
        .send(validModelData)
        .set('Authorization', token)
        .expect(200)
        .then((response) => {
          instanceId = response.body.id;
          done();
        });
    });

    afterEach((done) => {
      const token = userData.owner.token;

      // TODO: Fix url?
      console.log(`${apiUrlPrefix}/${modelPlural}/${instanceId}`);

      api
        .delete(`${apiUrlPrefix}/${modelPlural}/${instanceId}`)
        .set('Authorization', token)
        .expect(204, done);
    });

    describe('endpoints', () => {
      describe('create', () => {
        verb = verbs.post;
        config.path = `${apiUrlPrefix}/${modelPlural}`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.accessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });
      describe('patchOrCreate', () => {
        verb = verbs.patch;
        config.path = `${apiUrlPrefix}/${modelPlural}`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.inaccessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });
      describe('replaceOrCreate', () => {
        verb = verbs.put;
        config.path = `${apiUrlPrefix}/${modelPlural}`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.inaccessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });
      describe('find', () => {
        verb = verbs.get;
        config.path = `${apiUrlPrefix}/${modelPlural}`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.inaccessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });

      describe('patchAttributes', () => {
        verb = verbs.patch;
        config.path = `${apiUrlPrefix}/${modelPlural}/${instanceId}`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.inaccessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });
      describe('findById', () => {
        verb = verbs.get;
        config.path = `${apiUrlPrefix}/${modelPlural}/${instanceId}`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.inaccessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });
      describe('replaceById', () => {
        verb = verbs.put;
        config.path = `${apiUrlPrefix}/${modelPlural}/${instanceId}`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.inaccessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });
      describe('deleteById', () => {
        verb = verbs.delete;
        config.path = `${apiUrlPrefix}/${modelPlural}/${instanceId}`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.inaccessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });

      describe('exists', () => {
        verb = verbs.get;
        config.path = `${apiUrlPrefix}/${modelPlural}/exists`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.inaccessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });
      describe('replaceById', () => {
        verb = verbs.post;
        config.path = `${apiUrlPrefix}/${modelPlural}/replace`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.inaccessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });
      describe('createChangeStream', () => {
        verb = verbs.get;
        config.path = `${apiUrlPrefix}/${modelPlural}/change-stream`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.disabled(userData, config);
        });

        verb = verbs.post;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.disabled(userData, config);
        });
      });
      describe('count', () => {
        verb = verbs.get;
        config.path = `${apiUrlPrefix}/${modelPlural}/count`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.disabled(userData, config);
        });
      });
      describe('findOne', () => {
        verb = verbs.get;
        config.path = `${apiUrlPrefix}/${modelPlural}/findOne`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.inaccessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });
      describe('replaceOrCreate', () => {
        verb = verbs.put;
        config.path = `${apiUrlPrefix}/${modelPlural}/replaceOrCreate`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.disabled(userData, config);
        });
      });
      describe('updateAll', () => {
        verb = verbs.post;
        config.path = `${apiUrlPrefix}/${modelPlural}/update`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.disabled(userData, config);
        });
      });
      describe('upsertWithWhere', () => {
        verb = verbs.post;
        config.path = `${apiUrlPrefix}/${modelPlural}/upsertWithWhere`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.disabled(userData, config);
        });
      });

      // Jobs
      describe('prototype.__get__job', () => {
        verb = verbs.get;
        config.path = `${apiUrlPrefix}/${modelPlural}/${instanceId}/job`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.inaccessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });

      // User
      describe('prototype.__get__user', () => {
        verb = verbs.get;
        config.path = `${apiUrlPrefix}/${modelPlural}/${instanceId}/user`;
        config.request = verb.fn;

        describe(`${verb.name} ${config.path}`, () => {
          shouldBe.inaccessibleBy(userData.anonymous, config);
          shouldBe.inaccessibleBy(userData.authenticated, config);
          shouldBe.accessibleBy(userData.owner, config);
        });
      });
    });
  });
};


const userCredentials = {
  authenticated: {
    username: 'testuser1',
    password: 'testuser1',
  },
  owner: {
    username: 'testuser2',
    password: 'testuser2',
  },
};

const userData = {
  anonymous: { name: 'anonymous', token: null, id: null },
  authenticated: { name: 'authenticated' },
  owner: { name: 'owner' },
};

api
  .post(`${apiUrlPrefix}/users/login`)
  .send(userCredentials.owner)
  .expect(200)
  .then((response) => {
    userData.owner.token = response.body.id;
    userData.owner.id = response.body.userId;

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

