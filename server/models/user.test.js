/* eslint-disable no-unused-expressions */
const request = require('supertest-as-promised');
const generateHTTPVerbs = require('./testHelpers').generateHTTPVerbs;
const contentTypePatterns = require('./testHelpers').contentTypePatterns;
const should = require('./testHelpers').should;
const app = require('../server');

const api = request(app);
const apiUrlPrefix = '/api';
const verbs = generateHTTPVerbs(api);

const modelPlural = 'users';

const describeTests = (userData) => {
  let instanceId;
  let instanceToken;

  describe('Users', () => {
    describe('endpoints', () => {
      const validModelData = {
        username: 'testuser9',
        email: 'testuser9@example.com',
        password: 'testuser9',
      };
      const validModelCredentials = {
        username: 'testuser9',
        password: 'testuser9',
      };

      beforeEach((done) => {
        api
          .post(`${apiUrlPrefix}/${modelPlural}`)
          .send(validModelData)
          .expect(200)
          .then(() => (
            api
              .post(`${apiUrlPrefix}/users/login`)
              .send(validModelCredentials)
              .expect(200)
          ))
          .then((response) => {
            instanceToken = response.body.id;
            instanceId = response.body.userId;
            done();
          });
      });

      afterEach((done) => {
        api
          .get(`${apiUrlPrefix}/${modelPlural}/${instanceId}/exists`)
          .set('Authorization', instanceToken)
          .then((response) => {
            // Only proceed to delete the instance if is still exists
            if (response.statusCode !== 200) {
              done();
            } else {
              api
                .delete(`${apiUrlPrefix}/${modelPlural}/${instanceId}`)
                .set('Authorization', instanceToken)
                .expect(200, done);
            }
          })
          .catch(err => console.error(err));
      });

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
            it(should.beAccessible, (done) => {
              const newUserData = {
                username: `${Date.now()}`,
                email: `${Date.now()}@example.com`,
                password: `${Date.now()}`,
              };

              should.beAccessibleBy(userData.anonymous, config, newUserData, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, config, done
              );
            });
          });
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, config, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, config, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, config, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, config, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, config, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, config, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, config, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            // This endpoint should be disabled (404/500) but instead returns
            // 401 for anonymous users.
            // Issue: https://github.com/strongloop/loopback/issues/2952
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { token: userData.authenticated.token }
              );
              should.beInaccessibleBy(userData.authenticated, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { token: userData.authenticated.token }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, config, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { token: userData.authenticated.token }
              );
              should.beDisabledFor(userData.authenticated, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { token: userData.authenticated.token }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, config, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            // This endpoint should be disabled (404/500) but instead returns
            // 401 for anonymous users.
            // Issue: https://github.com/strongloop/loopback/issues/2952
            it(should.beInaccessible, (done) => {
              should.beInaccessibleBy(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, config, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, config, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            // This endpoint should be disabled (404/500) but instead returns
            // 401 for anonymous users.
            // Issue: https://github.com/strongloop/loopback/issues/2952
            it(should.beInaccessible, (done) => {
              should.beInaccessibleBy(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, config, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, config, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            // This endpoint should be disabled (404/500) but instead returns
            // 401 for anonymous users.
            // Issue: https://github.com/strongloop/loopback/issues/2952
            it(should.beInaccessible, (done) => {
              should.beInaccessibleBy(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, config, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, config, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, config, done
              );
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
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, config, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              should.beDisabledFor(userData.authenticated, config, done);
            });
            it(should.haveJSONContentType, (done) => {
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, config, done
              );
            });
          });
        });
      });
    });

    describe('AccessTokens', () => {
        /*
      const validModelData = {
        description: 'This is an example',
        startDate: Date.now(),
        type: 'communication',
        notes: 'These are notes',
      };

      beforeEach((done) => {
        const { userId, token } = userData.owner;

        api
          .post(`${apiUrlPrefix}/interactions`)
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
       */


      describe('prototype.__get__accessTokens', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/accessTokens`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beAccessibleBy(userData.authenticated, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__create__accessTokens', () => {
        const verb = verbs.post;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/accessTokens`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__delete__accessTokens', () => {
        const verb = verbs.delete;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/accessTokens`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__findById__accessTokens', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/accessTokens/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__destroyById__accessTokens', () => {
        const verb = verbs.delete;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/accessTokens/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__updateById__accessTokens', () => {
        const verb = verbs.put;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/accessTokens/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__count__accessTokens', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/accessTokens/count`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beAccessibleBy(userData.authenticated, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
    });

    describe('Interactions', () => {
      const validModelData = {
        description: 'This is an example',
        startDate: Date.now(),
        type: 'communication',
        notes: 'These are notes',
      };

      beforeEach((done) => {
        const { userId, token } = userData.owner;

        api
          .post(`${apiUrlPrefix}/interactions`)
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
          .get(`${apiUrlPrefix}/interactions/${instanceId}/exists`)
          .set('Authorization', token)
          .then((response) => {
            // Only proceed to delete the instance if is still exists
            if (response.statusCode !== 200) {
              done();
            } else {
              api
                .delete(`${apiUrlPrefix}/interactions/${instanceId}`)
                .set('Authorization', token)
                .expect(200, done);
            }
          })
          .catch(err => console.error(err));
      });


      describe('prototype.__get__interactions', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/interactions`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beAccessibleBy(userData.authenticated, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__create__interactions', () => {
        const verb = verbs.post;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/interactions`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__delete__interactions', () => {
        const verb = verbs.delete;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/interactions`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__findById__interactions', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/interactions/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__destroyById__interactions', () => {
        const verb = verbs.delete;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/interactions/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__updateById__interactions', () => {
        const verb = verbs.put;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/interactions/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__count__interactions', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/interactions/count`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beAccessibleBy(userData.authenticated, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
    });

    describe('Jobs', () => {
      const validModelData = {
        title: 'Just some job',
        status: 'open',
        notes: 'These are notes',
      };

      beforeEach((done) => {
        const { userId, token } = userData.owner;

        api
          .post(`${apiUrlPrefix}/jobs`)
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
          .get(`${apiUrlPrefix}/jobs/${instanceId}/exists`)
          .set('Authorization', token)
          .then((response) => {
            // Only proceed to delete the instance if is still exists
            if (response.statusCode !== 200) {
              done();
            } else {
              api
                .delete(`${apiUrlPrefix}/jobs/${instanceId}`)
                .set('Authorization', token)
                .expect(200, done);
            }
          })
          .catch(err => console.error(err));
      });


      describe('prototype.__get__jobs', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/jobs`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beAccessibleBy(userData.authenticated, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__create__jobs', () => {
        const verb = verbs.post;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/jobs`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__delete__jobs', () => {
        const verb = verbs.delete;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/jobs`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__findById__jobs', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/jobs/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__destroyById__jobs', () => {
        const verb = verbs.delete;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/jobs/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__updateById__jobs', () => {
        const verb = verbs.put;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/jobs/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__count__jobs', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/jobs/count`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beAccessibleBy(userData.authenticated, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
    });

    describe('Offers', () => {
      const validModelData = {
        givenDate: Date.now(),
        status: 'rejected',
        notes: 'These are notes',
      };

      beforeEach((done) => {
        const { userId, token } = userData.owner;

        api
          .post(`${apiUrlPrefix}/offers`)
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
          .get(`${apiUrlPrefix}/offers/${instanceId}/exists`)
          .set('Authorization', token)
          .then((response) => {
            // Only proceed to delete the instance if is still exists
            if (response.statusCode !== 200) {
              done();
            } else {
              api
                .delete(`${apiUrlPrefix}/offers/${instanceId}`)
                .set('Authorization', token)
                .expect(200, done);
            }
          })
          .catch(err => console.error(err));
      });


      describe('prototype.__get__offers', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/offers`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beAccessibleBy(userData.authenticated, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__create__offers', () => {
        const verb = verbs.post;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/offers`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__delete__offers', () => {
        const verb = verbs.delete;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/offers`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__findById__offers', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/offers/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__destroyById__offers', () => {
        const verb = verbs.delete;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/offers/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__updateById__offers', () => {
        const verb = verbs.put;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/offers/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__count__offers', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/offers/count`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beAccessibleBy(userData.authenticated, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
    });

    describe('Searches', () => {
      const validModelData = {
        title: 'Just some search',
        status: 'open',
        notes: 'These are notes',
      };

      beforeEach((done) => {
        const { userId, token } = userData.owner;

        api
          .post(`${apiUrlPrefix}/searches`)
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
          .get(`${apiUrlPrefix}/searches/${instanceId}/exists`)
          .set('Authorization', token)
          .then((response) => {
            // Only proceed to delete the instance if is still exists
            if (response.statusCode !== 200) {
              done();
            } else {
              api
                .delete(`${apiUrlPrefix}/searches/${instanceId}`)
                .set('Authorization', token)
                .expect(200, done);
            }
          })
          .catch(err => console.error(err));
      });


      describe('prototype.__get__searches', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/searches`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beAccessibleBy(userData.authenticated, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__create__searches', () => {
        const verb = verbs.post;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/searches`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__delete__searches', () => {
        const verb = verbs.delete;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/searches`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {}, config, { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__findById__searches', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/searches/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__destroyById__searches', () => {
        const verb = verbs.delete;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/searches/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__updateById__searches', () => {
        const verb = verbs.put;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/searches/:fk`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beDisabled, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.beDisabledFor(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                {
                  path: config.path
                    .replace(':id', userData.authenticated.userId)
                    .replace(':fk', instanceId),
                }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
            });
          });
        });
      });
      describe('prototype.__count__searches', () => {
        const verb = verbs.get;
        const config = {
          request: verb.fn,
          path: `${apiUrlPrefix}/${modelPlural}/:id/searches/count`,
          token: '',
        };

        describe(`${verb.name} ${config.path}`, () => {
          // Anonymous
          describe(userData.anonymous.name, () => {
            it(should.beInaccessible, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beInaccessibleBy(userData.anonymous, configCopy, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.anonymous, configCopy, done
              );
            });
          });

          // Authenticated
          describe(userData.authenticated.name, () => {
            it(should.beAccessible, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.beAccessibleBy(userData.authenticated, configCopy, null, done);
            });
            it(should.haveJSONContentType, (done) => {
              const configCopy = Object.assign(
                {},
                config,
                { path: config.path.replace(':id', userData.authenticated.userId) }
              );
              should.matchContentType(
                contentTypePatterns.json, userData.authenticated, configCopy, done
              );
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

