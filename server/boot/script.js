const Promise = require('bluebird');

module.exports = (app) => {
  if (process.env.NODE_ENV === 'test') {
    const User = app.models.user;

    // Use bluebird Promises to create a promise chain as
    // Loopback doesn't support promises yet, and promisify(All) doesn't work
    // https://github.com/strongloop/loopback/issues/418#issue-38984704
    new Promise((resolve, reject) => {
      // Create testuser1
      User.find({ where: { username: 'testuser1' } }, (findUserError, users) => {
        if (findUserError) return reject(findUserError);

        if (users.length === 0) {
          User.create({
            username: 'testuser1',
            email: 'testuser1@example.com',
            password: 'testuser1',
          }, (createUserError) => {
            if (createUserError) return reject(createUserError);
            return resolve();
          });
        }
        return resolve();
      });
    })
    .then(() => (
      new Promise((resolve, reject) => {
        User.find({ where: { username: 'testuser2' } }, (findUserError, users) => {
          if (findUserError) return reject(findUserError);

          if (users.length === 0) {
            User.create({
              username: 'testuser2',
              email: 'testuser2@example.com',
              password: 'testuser2',
            }, (createUserError) => {
              if (createUserError) return reject(createUserError);
              return resolve();
            });
          }
          return resolve();
        });
      })
    ))
    .catch(err => console.error(err));
  }
};

