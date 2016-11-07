/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server');

const api = request(app);
const apiUrlPrefix = '/api';
const modelPlural = 'interactions';

const methods = {
  get: { name: 'GET', fn: api.get },
  put: { name: 'PUT', fn: api.put },
  patch: { name: 'PATCH', fn: api.patch },
  delete: { name: 'DELETE', fn: api.delete },
  post: { name: 'POSt', fn: api.post },
};

const endpoints = [
  // patchOrCreate
  {
    path: `/${modelPlural}`,
    method: methods.patch,
    expects: [
      {
        description: 'should respond with 404',
        test: (response) => {
          expect(response.status)
            .to.equal(404);
        },
      },
    ],
  },
  // find
  {
    path: `/${modelPlural}`,
    method: methods.get,
  },
  // replaceOrCreate
  {
    path: `/${modelPlural}`,
    method: methods.put,
  },
  // create
  {
    path: `/${modelPlural}`,
    method: methods.post,
  },

  // patchAttributes
  {
    path: id => `/${modelPlural}/${id}`,
    method: methods.patch,
  },
  // findById
  {
    path: id => `/${modelPlural}/${id}`,
    method: methods.get,
  },
  // replaceById
  {
    path: id => `/${modelPlural}/${id}`,
    method: methods.put,
  },
  // deleteById
  {
    path: id => `/${modelPlural}/${id}`,
    method: methods.delete,
  },

  // exists
  {
    path: id => `/${modelPlural}/${id}/exists`,
    method: methods.get,
  },
  // replaceById
  {
    path: id => `/${modelPlural}/${id}/replace`,
    method: methods.post,
  },
  // createChangeStream
  {
    path: `/${modelPlural}/change-stream`,
    method: methods.get,
  },
  {
    path: `/${modelPlural}/change-stream`,
    method: methods.post,
  },
  // count
  {
    path: `/${modelPlural}/count`,
    method: methods.get,
  },
  // findOne
  {
    path: `/${modelPlural}/findOne`,
    method: methods.get,
  },
  // replaceOrCreate
  {
    path: `/${modelPlural}/replaceOrCreate`,
    method: methods.put,
  },
  // updateAll
  {
    path: `/${modelPlural}/update`,
    method: methods.post,
  },
  // upsertWithWhere
  {
    path: `/${modelPlural}/upsertWithWhere`,
    method: methods.post,
  },
];

describe('Interactions', () => {
  describe('endpoints', () => {
    endpoints
      .slice(0, 1)
      .forEach((endpoint) => {
        endpoint.expects
          .forEach(({ description, test }) => {
            it(`${endpoint.method.name} ${endpoint.path} ${description}`, (done) => {
              endpoint.method.fn(`${apiUrlPrefix}/${endpoint.path}`)
                .end((err, response) => {
                  if (err) return done(err);

                  test(response);
                  return done();
                });
            });
          });
      });
  });
});
