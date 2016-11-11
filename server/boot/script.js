const Promise = require('bluebird');

module.exports = (app) => {
  if (process.env.NODE_ENV === 'test') {
    const RoleMapping = app.models.RoleMapping;
    const Role = app.models.Role;
    const User = app.models.user;

    let testUser;
    let testAdmin;

    // Use bluebird Promises to create a promise chain as
    // Loopback doesn't support promises yet, and promisify(All) doesn't work
    // https://github.com/strongloop/loopback/issues/418#issue-38984704
    return new Promise((resolve, reject) => {
      // Create testuser
      User.find({ where: { username: 'testuser' } }, (findUserError, users) => {
        if (findUserError) return reject(findUserError);

        if (users.length === 0) {
          User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testuser',
          }, (createUserError, user) => {
            if (createUserError) return reject(createUserError);

            testUser = user;
            return resolve();
          });
        }

        testUser = users[0];
        return resolve();
      });
    })
    .then(() => (
      new Promise((resolve, reject) => {
        // Create testadmin
        User.find({ where: { username: 'testadmin' } }, (findUserError, users) => {
          if (findUserError) {
            console.log(findUserError);
            return reject('cats');
          }

          if (users.length === 0) {
            User.create({
              username: 'testadmin',
              email: 'testadmin@example.com',
              password: 'testadmin',
            }, (createUserError, user) => {
              if (createUserError) return reject('dogs');

              testAdmin = user;
              return resolve();
            });
          }

          testAdmin = users[0];
          return resolve();
        });
      })
    ))
    .then(() => (
      new Promise((resolve, reject) => {
        Role.find({ where: { name: 'admin' } }, (findRoleError, roles) => {
          if (findRoleError) {
            console.log(findRoleError);
            return reject('cats');
          }

          if (roles.length === 0) {
            Role.create({ name: 'admin' }, (err, role) => {
              if (err) return reject(err);
              console.log('Created role admin');

              return role.principals.create({
                principalType: RoleMapping.USER,
                principalId: testAdmin.id,
              }, (principalCreationErr) => {
                if (principalCreationErr) return reject(principalCreationErr);

                console.log(`Set ${testAdmin.username} as an admin`);
                return resolve();
              });
            });
          }

          return resolve();
        });
      })
    ))
    .catch(err => console.error(err));
  }
};

