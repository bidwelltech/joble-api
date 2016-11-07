module.exports = (app) => {
  const Role = app.models.Role;

  // Create the `admin` role and a default administrator
  Role.create({
    name: 'admin',
  }, () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log('Created admin role');
    }
  });
};

