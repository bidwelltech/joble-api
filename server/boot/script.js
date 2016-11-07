'use strict';

module.exports = function (app) {
  const Role = app.models.Role;

  console.log('creating roles: admin');

  // Create the `admin` role and a default administrator
  Role.create({
    name: 'admin'
  });
};

