const path = require('path');
const app = require(path.resolve(__dirname, '../server'))

const psql = app.datasources.apiDb;
const defaultModels = [
  'User',
  'AccessToken',
  'ACL',
  'RoleMapping',
  'Role',
];
const appModelKeys = Object.keys(app.models).filter(key => !defaultModels.includes(key));
//console.log(psql.settings);

appModelKeys.forEach((key) => {
  psql.automigrate(key);
  console.log(`Migrated ${key}.`);
});
