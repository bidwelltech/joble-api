/* eslint-disable no-unused-expressions */
// const expect = require('chai').expect;
const request = require('supertest-as-promised');
const generateHTTPVerbs = require('./testHelpers').generateHTTPVerbs;
const should = require('./testHelpers').should;
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
  const validModelData = {
    description: 'This is an example',
    startDate: Date.now(),
    type: 'communication',
    notes: 'These are notes',
  };

  let instanceId;

  describe('Interactions', () => {
    beforeEach((done) => {
      const { userId, token } = userData.owner;

      api
        .post(`${apiUrlPrefix}/${modelPlural}`)
        .send(Object.assign(
          {}, validModelData, { userId }
        ))
        .set('Authorization', token)
        .expect(200)
        .then((response) => {
          instanceId = response.body.id;
          done();
        });
    });

    afterEach((done) => {
      const token = userData.owner.token;

      api
        .get(`${apiUrlPrefix}/${modelPlural}/${instanceId}/exists`)
        .set('Authorization', token)
        .then((response) => {
          // Only proceed to delete the instance if is still exists
          if (response.statusCode !== 200) {
            done();
          } else {
            api
              .delete(`${apiUrlPrefix}/${modelPlural}/${instanceId}`)
              .set('Authorization', token)
              .expect(200, done);
          }
        })
        .catch(err => console.error(err));
    });

    describe('endpoints', () => {
      describe('create', () => {
        const verb = verbs.post;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              should.beInaccessibleBy(userData.anonymous, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.anonymous, config, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beAccessible, (done) => {
              const dataToSend = Object.assign(
                {}, validModelData, { userId: userData.authenticated.userId }
              );
              should.beAccessibleBy(userData.authenticated, config, dataToSend, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.authenticated, config, done);
            });
          });

          // Owner doesn't mean anything for endpoints that don't refer to a
          // specific object.
        });
      });
      describe('patchOrCreate', () => {
        const verb = verbs.patch;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.anonymous, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.anonymous, config, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.authenticated, config, done);
            });
          });

          // Owner doesn't mean anything for endpoints that don't refer to a
          // specific object.
        });
      });
      describe('replaceOrCreate', () => {
        const verb = verbs.put;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.anonymous, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.anonymous, config, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.authenticated, config, done);
            });
          });

          // Owner doesn't mean anything for endpoints that don't refer to a
          // specific object.
        });
      });
      describe('find', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.anonymous, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.anonymous, config, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.authenticated, config, done);
            });
          });

          // Owner doesn't mean anything for endpoints that don't refer to a
          // specific object.
        });
      });

      describe('patchAttributes', () => {
        const verb = verbs.patch;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              // TODO: Replace Object.assign() with ES6 object spread operator
              //
              // should.beInaccessibleBy(
              //    userData.anonymous,
              //    { ...config, path: config.path.replace(':id', instanceId) }
              //    done
              // );
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.anonymous, configCopy, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.authenticated, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.authenticated, configCopy, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beAccessibleBy(userData.owner, configCopy, validModelData, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.owner, configCopy, done);
            });
          });
        });
      });
      describe('findById', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.anonymous, configCopy, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.authenticated, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.authenticated, configCopy, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beAccessibleBy(userData.owner, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.owner, configCopy, done);
            });
          });
        });
      });
      describe('replaceById', () => {
        const verb = verbs.put;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.anonymous, configCopy, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.authenticated, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.authenticated, configCopy, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beAccessibleBy(userData.owner, configCopy, validModelData, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.owner, configCopy, done);
            });
          });
        });
      });
      describe('deleteById', () => {
        const verb = verbs.delete;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.anonymous, configCopy, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.authenticated, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.authenticated, configCopy, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beAccessibleBy(userData.owner, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.owner, configCopy, done);
            });
          });
        });
      });

      describe('exists', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/exists`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.anonymous, configCopy, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.authenticated, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.authenticated, configCopy, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beAccessibleBy(userData.owner, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.owner, configCopy, done);
            });
          });
        });
      });
      describe('replaceById', () => {
        const verb = verbs.post;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/replace`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.anonymous, configCopy, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.authenticated, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.authenticated, configCopy, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              const dataToSend = Object.assign(
                {}, validModelData, { userId: userData.authenticated.userId }
              );
              should.beAccessibleBy(userData.owner, configCopy, dataToSend, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.owner, configCopy, done);
            });
          });
        });
      });
      describe('createChangeStream', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/change-stream`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            // This endpoint should be disabled (404/500) but instead returns
            // 401 for anonymous users.
            // Issue: https://github.com/strongloop/loopback/issues/2952
            it(should.beInaccessible, (done) => {
              should.beInaccessibleBy(userData.anonymous, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.anonymous, config, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.authenticated, config, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.owner, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.owner, config, done);
            });
          });
        });
      });
      describe('createChangeStream', () => {
        const verb = verbs.post;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/change-stream`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.anonymous, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.anonymous, config, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.authenticated, config, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.owner, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.owner, config, done);
            });
          });
        });
      });
      describe('count', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/count`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            // This endpoint should be disabled (404/500) but instead returns
            // 401 for anonymous users.
            // Issue: https://github.com/strongloop/loopback/issues/2952
            it(should.beInaccessible, (done) => {
              should.beInaccessibleBy(userData.anonymous, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.anonymous, config, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.authenticated, config, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.owner, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.owner, config, done);
            });
          });
        });
      });
      describe('findOne', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/findOne`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            // This endpoint should be disabled (404/500) but instead returns
            // 401 for anonymous users.
            // Issue: https://github.com/strongloop/loopback/issues/2952
            it(should.beInaccessible, (done) => {
              should.beInaccessibleBy(userData.anonymous, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.anonymous, config, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.authenticated, config, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.owner, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.owner, config, done);
            });
          });
        });
      });
      describe('replaceOrCreate', () => {
        const verb = verbs.put;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/replace`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            // This endpoint should be disabled (404/500) but instead returns
            // 401 for anonymous users.
            // Issue: https://github.com/strongloop/loopback/issues/2952
            it(should.beInaccessible, (done) => {
              should.beInaccessibleBy(userData.anonymous, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.anonymous, config, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.authenticated, config, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.owner, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.owner, config, done);
            });
          });
        });
      });
      describe('updateAll', () => {
        const verb = verbs.post;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/update`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.anonymous, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.anonymous, config, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.authenticated, config, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.owner, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.owner, config, done);
            });
          });
        });
      });
      describe('upsertWithWhere', () => {
        const verb = verbs.post;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/upsertWithWhere`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            // This endpoint should be disabled (404/500) but instead returns
            // 401 for anonymous users.
            // Issue: https://github.com/strongloop/loopback/issues/2952
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.anonymous, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.anonymous, config, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.authenticated, config, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.owner, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(/.*json.*/, userData.owner, config, done);
            });
          });
        });
      });

      // Job
      describe('prototype.__get__job', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/job`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.anonymous, configCopy, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.authenticated, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.authenticated, configCopy, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beAccessibleBy(userData.owner, configCopy, validModelData, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.owner, configCopy, done);
            });
          });
        });
      });

      // User
      describe('prototype.__get__user', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/user`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.anonymous, configCopy, done);
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beInaccessibleBy(userData.authenticated, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.authenticated, configCopy, done);
            });
          });

          // Owner
          describe(userData.owner.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.beAccessibleBy(userData.owner, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', instanceId) }
              );
              should.matchContentType(/.*json.*/, userData.owner, configCopy, done);
            });
          });
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
  anonymous: { name: 'anonymous', token: null, userId: null },
  authenticated: { name: 'authenticated' },
  owner: { name: 'owner' },
};

api
  .post(`${apiUrlPrefix}/users/login`)
  .send(userCredentials.owner)
  .expect(200)
  .then((response) => {
    userData.owner.token = response.body.id;
    userData.owner.userId = response.body.userId;

    return api
      .post(`${apiUrlPrefix}/users/login`)
      .send(userCredentials.authenticated)
      .expect(200);
  })
  .then((response) => {
    userData.authenticated.token = response.body.id;
    userData.authenticated.userId = response.body.userId;

    // Available thanks to the --delay flag
    // ref: https://github.com/mochajs/mocha/issues/2257#issuecomment-219313311
    describeTests(userData);

    // eslint's mocha env doesn't include `run`, so disable the no-undef test
    // eslint-disable-next-line no-undef
    run();
  })
  .catch(err => console.error(err));

